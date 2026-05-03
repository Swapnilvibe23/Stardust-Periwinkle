import { getUncachableRevenueCatClient } from "./revenueCatClient";

import {
  listProjects,
  createProject,
  listApps,
  createApp,
  listAppPublicApiKeys,
  listProducts,
  createProduct,
  listEntitlements,
  createEntitlement,
  attachProductsToEntitlement,
  listOfferings,
  createOffering,
  updateOffering,
  listPackages,
  createPackages,
  attachProductsToPackage,
  type App,
  type Product,
  type Project,
  type Entitlement,
  type Offering,
  type Package,
  type CreateProductData,
} from "@replit/revenuecat-sdk";

const PROJECT_NAME = "Stardust & Periwinkle";

// ─── iOS bundle & Android package ─────────────────────────────────────────────
// Update these when you have your App Store / Play Store apps set up
const APP_STORE_APP_NAME = "Stardust & Periwinkle (iOS)";
const APP_STORE_BUNDLE_ID = "com.stardustandperiwinkle.app";
const PLAY_STORE_APP_NAME = "Stardust & Periwinkle (Android)";
const PLAY_STORE_PACKAGE_NAME = "com.stardustandperiwinkle.app";

// ─── Entitlement ──────────────────────────────────────────────────────────────
const ENTITLEMENT_IDENTIFIER = "products";
const ENTITLEMENT_DISPLAY_NAME = "Digital Products";

// ─── Offering ─────────────────────────────────────────────────────────────────
const OFFERING_IDENTIFIER = "default";
const OFFERING_DISPLAY_NAME = "Default Offering";

// ─── Products ─────────────────────────────────────────────────────────────────
// 5 placeholder one-time products — update titles/prices once final content is ready
const PRODUCTS = [
  {
    identifier: "product_1",
    playIdentifier: "product_1:monthly",
    displayName: "Digital Product 1",
    title: "Digital Product 1",
    packageIdentifier: "product_1_pkg",
    packageDisplayName: "Product 1",
    priceMicros: 4990000, // $4.99
  },
  {
    identifier: "product_2",
    playIdentifier: "product_2:monthly",
    displayName: "Digital Product 2",
    title: "Digital Product 2",
    packageIdentifier: "product_2_pkg",
    packageDisplayName: "Product 2",
    priceMicros: 4990000,
  },
  {
    identifier: "product_3",
    playIdentifier: "product_3:monthly",
    displayName: "Digital Product 3",
    title: "Digital Product 3",
    packageIdentifier: "product_3_pkg",
    packageDisplayName: "Product 3",
    priceMicros: 9990000, // $9.99
  },
  {
    identifier: "product_4",
    playIdentifier: "product_4:monthly",
    displayName: "Digital Product 4",
    title: "Digital Product 4",
    packageIdentifier: "product_4_pkg",
    packageDisplayName: "Product 4",
    priceMicros: 9990000,
  },
  {
    identifier: "product_5",
    playIdentifier: "product_5:monthly",
    displayName: "Digital Product 5",
    title: "Digital Product 5",
    packageIdentifier: "product_5_pkg",
    packageDisplayName: "Product 5",
    priceMicros: 14990000, // $14.99
  },
];

type TestStorePricesResponse = {
  object: string;
  prices: { amount_micros: number; currency: string }[];
};

async function ensureProduct(
  client: any,
  projectId: string,
  existingProducts: Product[],
  targetApp: App,
  label: string,
  productIdentifier: string,
  displayName: string,
  title: string,
  priceMicros: number,
  isTestStore: boolean,
  projectIdForPrices: string
): Promise<Product> {
  const existing = existingProducts.find(
    (p) => p.store_identifier === productIdentifier && p.app_id === targetApp.id
  );

  if (existing) {
    console.log(`  ${label} product already exists: ${existing.id}`);
    return existing;
  }

  const body: CreateProductData["body"] = {
    store_identifier: productIdentifier,
    app_id: targetApp.id,
    type: "subscription",
    display_name: displayName,
  };

  if (isTestStore) {
    body.subscription = { duration: "P1M" };
    body.title = title;
  }

  const { data: created, error } = await createProduct({
    client,
    path: { project_id: projectId },
    body,
  });

  if (error) throw new Error(`Failed to create ${label} product: ${JSON.stringify(error)}`);
  console.log(`  Created ${label} product: ${created.id}`);

  if (isTestStore) {
    const { error: priceError } = await client.post<TestStorePricesResponse>({
      url: "/projects/{project_id}/products/{product_id}/test_store_prices",
      path: { project_id: projectId, product_id: created.id },
      body: { prices: [{ amount_micros: priceMicros, currency: "USD" }] },
    });

    if (priceError && (priceError as any)?.type !== "resource_already_exists") {
      throw new Error(`Failed to set price: ${JSON.stringify(priceError)}`);
    }
    console.log(`  Set price: $${(priceMicros / 1_000_000).toFixed(2)}`);
  }

  return created;
}

async function seedRevenueCat() {
  const client = await getUncachableRevenueCatClient();

  // ── Project ────────────────────────────────────────────────────────────────
  const { data: existingProjects, error: lpErr } = await listProjects({ client, query: { limit: 20 } });
  if (lpErr) throw new Error("Failed to list projects");

  let project: Project =
    existingProjects.items?.find((p) => p.name === PROJECT_NAME) as Project;

  if (project) {
    console.log("Project found:", project.id);
  } else {
    const { data, error } = await createProject({ client, body: { name: PROJECT_NAME } });
    if (error) throw new Error("Failed to create project");
    project = data;
    console.log("Created project:", project.id);
  }

  // ── Apps ───────────────────────────────────────────────────────────────────
  const { data: appsData, error: laErr } = await listApps({
    client, path: { project_id: project.id }, query: { limit: 20 },
  });
  if (laErr) throw new Error("Failed to list apps");

  let testStoreApp = appsData.items.find((a) => a.type === "test_store");
  if (!testStoreApp) throw new Error("No test store app found");
  console.log("Test store app:", testStoreApp.id);

  let appStoreApp = appsData.items.find((a) => a.type === "app_store");
  if (!appStoreApp) {
    const { data, error } = await createApp({
      client, path: { project_id: project.id },
      body: { name: APP_STORE_APP_NAME, type: "app_store", app_store: { bundle_id: APP_STORE_BUNDLE_ID } },
    });
    if (error) throw new Error("Failed to create App Store app");
    appStoreApp = data;
    console.log("Created App Store app:", appStoreApp.id);
  } else {
    console.log("App Store app found:", appStoreApp.id);
  }

  let playStoreApp = appsData.items.find((a) => a.type === "play_store");
  if (!playStoreApp) {
    const { data, error } = await createApp({
      client, path: { project_id: project.id },
      body: { name: PLAY_STORE_APP_NAME, type: "play_store", play_store: { package_name: PLAY_STORE_PACKAGE_NAME } },
    });
    if (error) throw new Error("Failed to create Play Store app");
    playStoreApp = data;
    console.log("Created Play Store app:", playStoreApp.id);
  } else {
    console.log("Play Store app found:", playStoreApp.id);
  }

  // ── Products ───────────────────────────────────────────────────────────────
  const { data: existingProductsData, error: lprErr } = await listProducts({
    client, path: { project_id: project.id }, query: { limit: 100 },
  });
  if (lprErr) throw new Error("Failed to list products");
  const existingProducts = existingProductsData.items ?? [];

  // ── Entitlement ────────────────────────────────────────────────────────────
  const { data: existingEntitlements, error: leErr } = await listEntitlements({
    client, path: { project_id: project.id }, query: { limit: 20 },
  });
  if (leErr) throw new Error("Failed to list entitlements");

  let entitlement: Entitlement =
    existingEntitlements.items?.find((e) => e.lookup_key === ENTITLEMENT_IDENTIFIER) as Entitlement;

  if (entitlement) {
    console.log("Entitlement found:", entitlement.id);
  } else {
    const { data, error } = await createEntitlement({
      client, path: { project_id: project.id },
      body: { lookup_key: ENTITLEMENT_IDENTIFIER, display_name: ENTITLEMENT_DISPLAY_NAME },
    });
    if (error) throw new Error("Failed to create entitlement");
    entitlement = data;
    console.log("Created entitlement:", entitlement.id);
  }

  // ── Offering ───────────────────────────────────────────────────────────────
  const { data: existingOfferings, error: loErr } = await listOfferings({
    client, path: { project_id: project.id }, query: { limit: 20 },
  });
  if (loErr) throw new Error("Failed to list offerings");

  let offering: Offering =
    existingOfferings.items?.find((o) => o.lookup_key === OFFERING_IDENTIFIER) as Offering;

  if (offering) {
    console.log("Offering found:", offering.id);
  } else {
    const { data, error } = await createOffering({
      client, path: { project_id: project.id },
      body: { lookup_key: OFFERING_IDENTIFIER, display_name: OFFERING_DISPLAY_NAME },
    });
    if (error) throw new Error("Failed to create offering");
    offering = data;
    console.log("Created offering:", offering.id);
  }

  if (!offering.is_current) {
    const { error } = await updateOffering({
      client, path: { project_id: project.id, offering_id: offering.id },
      body: { is_current: true },
    });
    if (error) throw new Error("Failed to set offering as current");
    console.log("Set offering as current");
  }

  const { data: existingPkgs, error: lpkgErr } = await listPackages({
    client, path: { project_id: project.id, offering_id: offering.id }, query: { limit: 50 },
  });
  if (lpkgErr) throw new Error("Failed to list packages");

  // ── Per-product setup ──────────────────────────────────────────────────────
  for (const prod of PRODUCTS) {
    console.log(`\n── ${prod.displayName} ──`);

    const testProduct = await ensureProduct(
      client, project.id, existingProducts, testStoreApp,
      "Test Store", prod.identifier, prod.displayName, prod.title,
      prod.priceMicros, true, project.id
    );
    const appProduct = await ensureProduct(
      client, project.id, existingProducts, appStoreApp,
      "App Store", prod.identifier, prod.displayName, prod.title,
      prod.priceMicros, false, project.id
    );
    const playProduct = await ensureProduct(
      client, project.id, existingProducts, playStoreApp,
      "Play Store", prod.playIdentifier, prod.displayName, prod.title,
      prod.priceMicros, false, project.id
    );

    // Attach to entitlement
    const { error: attachEntErr } = await attachProductsToEntitlement({
      client,
      path: { project_id: project.id, entitlement_id: entitlement.id },
      body: { product_ids: [testProduct.id, appProduct.id, playProduct.id] },
    });
    if (attachEntErr && (attachEntErr as any)?.type !== "unprocessable_entity_error") {
      throw new Error(`Failed to attach ${prod.displayName} to entitlement`);
    }
    console.log(`  Attached to entitlement`);

    // Package
    let pkg: Package =
      existingPkgs.items?.find((p) => p.lookup_key === prod.packageIdentifier) as Package;

    if (!pkg) {
      const { data, error } = await createPackages({
        client,
        path: { project_id: project.id, offering_id: offering.id },
        body: { lookup_key: prod.packageIdentifier, display_name: prod.packageDisplayName },
      });
      if (error) throw new Error(`Failed to create package for ${prod.displayName}`);
      pkg = data;
      console.log(`  Created package: ${pkg.id}`);
    } else {
      console.log(`  Package found: ${pkg.id}`);
    }

    const { error: attachPkgErr } = await attachProductsToPackage({
      client,
      path: { project_id: project.id, package_id: pkg.id },
      body: {
        products: [
          { product_id: testProduct.id, eligibility_criteria: "all" },
          { product_id: appProduct.id, eligibility_criteria: "all" },
          { product_id: playProduct.id, eligibility_criteria: "all" },
        ],
      },
    });
    if (attachPkgErr && (attachPkgErr as any)?.type !== "unprocessable_entity_error") {
      throw new Error(`Failed to attach products to package: ${JSON.stringify(attachPkgErr)}`);
    }
    console.log(`  Products attached to package`);
  }

  // ── API Keys ───────────────────────────────────────────────────────────────
  const { data: testKeys } = await listAppPublicApiKeys({ client, path: { project_id: project.id, app_id: testStoreApp.id } });
  const { data: iosKeys } = await listAppPublicApiKeys({ client, path: { project_id: project.id, app_id: appStoreApp.id } });
  const { data: androidKeys } = await listAppPublicApiKeys({ client, path: { project_id: project.id, app_id: playStoreApp.id } });

  console.log("\n====================");
  console.log("RevenueCat setup complete!");
  console.log("Project ID:", project.id);
  console.log("Test Store App ID:", testStoreApp.id);
  console.log("App Store App ID:", appStoreApp.id);
  console.log("Play Store App ID:", playStoreApp.id);
  console.log("Entitlement:", ENTITLEMENT_IDENTIFIER);
  console.log("\nSet these environment variables:");
  console.log("REVENUECAT_PROJECT_ID=" + project.id);
  console.log("REVENUECAT_TEST_STORE_APP_ID=" + testStoreApp.id);
  console.log("REVENUECAT_APPLE_APP_STORE_APP_ID=" + appStoreApp.id);
  console.log("REVENUECAT_GOOGLE_PLAY_STORE_APP_ID=" + playStoreApp.id);
  console.log("EXPO_PUBLIC_REVENUECAT_TEST_API_KEY=" + (testKeys?.items?.[0]?.key ?? "N/A"));
  console.log("EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=" + (iosKeys?.items?.[0]?.key ?? "N/A"));
  console.log("EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=" + (androidKeys?.items?.[0]?.key ?? "N/A"));
  console.log("====================\n");
}

seedRevenueCat().catch(console.error);
