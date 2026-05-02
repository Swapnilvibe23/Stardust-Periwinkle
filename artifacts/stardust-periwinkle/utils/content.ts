import { AgeRange } from "@/contexts/ChildContext";

export interface CalmResult {
  whatToSay: string;
  whatToDo: string;
  whatToTry: string;
  activity: string;
  calmingAction: string;
}

export interface ActivityResult {
  title: string;
  materials: string[];
  steps: string[];
  whyItWorks: string;
}

export interface StoryResult {
  title: string;
  body: string;
}

export interface RoutineStep {
  action: string;
  script: string;
}

export interface BreathResult {
  validation: string;
  groundingAction: string;
  childActivity: string;
}

type CalmKey = "Meltdown / Tantrum" | "Hitting or Biting" | "Separation Anxiety" | "Sleep Resistance" | "Sibling Conflict";

const calmData: Record<CalmKey, Record<AgeRange, CalmResult>> = {
  "Meltdown / Tantrum": {
    "1-2": {
      whatToSay: '"I see you. I\'m right here with you."',
      whatToDo: "Get down to their level. Keep your voice soft and slow. Avoid talking too much — stay close and breathe.",
      whatToTry: "Offer a comfort item (stuffed animal, blanket). Create a safe, small space like a floor corner with pillows.",
      activity: "Slow rocking or swaying together while humming a familiar song.",
      calmingAction: "Take 3 deep belly breaths yourself — your calm transfers to them like magic.",
    },
    "3-4": {
      whatToSay: '"It\'s okay to feel big feelings. I\'m staying right here with you."',
      whatToDo: "Don't reason during the meltdown. Stay nearby without crowding. Offer a hug when they're ready.",
      whatToTry: "Redirect to a calm corner with a stuffed animal. Wait for the storm to pass before talking.",
      activity: "Blow bubbles together — the deep breaths are built right in.",
      calmingAction: "Place your hand gently on their back if they allow it. Your presence is the co-regulation.",
    },
    "5-6": {
      whatToSay: '"That feeling is really big right now. You don\'t have to hold it alone."',
      whatToDo: "Give them space but stay visible. Validate the emotion without fixing it right away.",
      whatToTry: 'Try a body scan together — "squeeze your hands tight, then let go… now your feet…"',
      activity: 'Draw the feeling together: "What color is the mad? What shape is it?"',
      calmingAction: "Five finger breathing — trace each finger slowly while breathing in and out.",
    },
    "7-8": {
      whatToSay: '"I can see this is really hard. Let\'s figure it out together when you\'re ready."',
      whatToDo: "Respect their need for space but check in gently. Avoid lecturing until they're calm.",
      whatToTry: "Offer a walk or some physical movement to discharge the big energy.",
      activity: "Journaling or drawing — helps process without needing to talk yet.",
      calmingAction: "4-7-8 breathing: breathe in 4 counts, hold for 7, out for 8.",
    },
  },
  "Hitting or Biting": {
    "1-2": {
      whatToSay: '"Ouch. We don\'t hit. I know you\'re really frustrated."',
      whatToDo: "Block calmly, don't overreact. Move them gently away and keep a neutral, steady tone.",
      whatToTry: "Give them something safe to squeeze or chew — teether, stress ball, or a soft pillow to pound.",
      activity: 'Redirect to patting a stuffed toy "gently, gently" — practicing gentle hands.',
      calmingAction: "Hum or sing softly — tone regulation helps regulate their nervous system too.",
    },
    "3-4": {
      whatToSay: '"Bodies are for being safe. Hitting hurts. Let\'s find another way to show how you feel."',
      whatToDo: "Stay calm. Give a brief acknowledgment and redirect. Don't shame — just redirect.",
      whatToTry: 'Teach them to stomp their feet, squeeze a pillow, or shout "I\'m SO mad!" into a pillow.',
      activity: "Rip paper together — safe physical release. Then throw it in the bin together.",
      calmingAction: 'Model slow breathing. Say "Watch me. Let\'s try together."',
    },
    "5-6": {
      whatToSay: '"I won\'t let you hurt others or yourself. Let\'s find what you need right now."',
      whatToDo: "Remove from the situation briefly. Be clear: the behavior isn't okay, but the feelings are.",
      whatToTry: 'Create a "safe ways to be mad" list together — something they help build.',
      activity: "Punch a pillow together — model it with them to show it's okay to feel angry.",
      calmingAction: 'Shake hands, then arms, then whole body — "shake the mad out!"',
    },
    "7-8": {
      whatToSay: '"I get it, you\'re really angry. Let\'s talk about it when we\'re both calm."',
      whatToDo: "Address the behavior matter-of-factly. Don't escalate with your own emotion.",
      whatToTry: '"What could you do next time instead?" — problem-solve together once calm.',
      activity: "Go outside and run, do jumping jacks, or kick a ball around together.",
      calmingAction: "Box breathing — 4 counts each: in, hold, out, hold.",
    },
  },
  "Separation Anxiety": {
    "1-2": {
      whatToSay: '"I love you. I\'ll be back. You\'re safe."',
      whatToDo: "Keep goodbyes short and consistent. Don't sneak away — a predictable routine builds trust.",
      whatToTry: "Create a simple goodbye ritual: one hug, one wave, one 'see you soon!'",
      activity: "Leave a photo of yourself or a piece of clothing with your scent.",
      calmingAction: "Trust the caregiver — lingering extends the distress. Go with love.",
    },
    "3-4": {
      whatToSay: '"I know it\'s hard when I go. I always come back. Every single time."',
      whatToDo: "Practice small separations. Acknowledge the feeling, then keep goodbyes brief.",
      whatToTry: 'Give them a "mama coin" or special object to hold until you return.',
      activity: '"When I come back, we can ___" — give them something to look forward to.',
      calmingAction: "Belly breathe together before separating — leave them on a calm breath.",
    },
    "5-6": {
      whatToSay: '"Missing me means you love me. That\'s a wonderful thing."',
      whatToDo: "Validate feelings then redirect to the fun ahead. Co-regulate before separating.",
      whatToTry: "Draw a simple clock showing when you'll return — tangible timelines help.",
      activity: 'Make a "worry jar" — they write or draw worries and "store" them until you\'re back.',
      calmingAction: 'Press your palms together before leaving — "mama energy stays with you."',
    },
    "7-8": {
      whatToSay: '"Your feelings make complete sense. And I know you can handle this."',
      whatToDo: "Give them tools for managing the anxious feeling — not just reassurance.",
      whatToTry: "Create a coping card together: what to do when the worry shows up.",
      activity: "Write each other letters to read during separation time.",
      calmingAction: "5-4-3-2-1: Name 5 things they see, 4 they touch, 3 they hear, 2 smell, 1 taste.",
    },
  },
  "Sleep Resistance": {
    "1-2": {
      whatToSay: '"Sleep time now. I love you. Night night."',
      whatToDo: "Stick to the same routine every night without variation. Predictability is the medicine.",
      whatToTry: "Dim lights 30 min before bed. No screens. Soft music or white noise in the background.",
      activity: "Gentle baby massage with lotion — lavender scent helps signal sleep time.",
      calmingAction: "Breathe slowly and deeply yourself while you hold them — your calm transfers.",
    },
    "3-4": {
      whatToSay: '"It\'s time for your body to rest. Even if your eyes don\'t close right away."',
      whatToDo: 'Offer two limited choices: "Bear or bunny tonight?" — giving control helps.',
      whatToTry: '"Make your toes sleepy, now your feet, now your legs…" — body scan up to the head.',
      activity: "One special bedtime story — same one each night for comfort and predictability.",
      calmingAction: "Hum or sing softly. Your voice is their anchor to safety.",
    },
    "5-6": {
      whatToSay: '"Your job right now is to rest your body — not to fall asleep right away."',
      whatToDo: "Keep the environment calm and boring. Boring equals sleepy.",
      whatToTry: 'Give them one "free pass" out of bed per night for a valid reason.',
      activity: "Quiet audiobook or soft music — gives the mind something gentle to follow.",
      calmingAction: '"Think of your happy place" — guide them through a simple visualization together.',
    },
    "7-8": {
      whatToSay: '"I know you\'re not tired yet. Your body still needs the rest."',
      whatToDo: "Negotiate: 15 min quiet reading in bed is fine. Then lights out — no negotiation.",
      whatToTry: "Sleep hygiene they can own: no screens 1hr before, same bedtime, cool room.",
      activity: "Bedtime journal — brain dump before sleep clears the mental clutter.",
      calmingAction: "Progressive muscle relaxation — tense and release each body part systematically.",
    },
  },
  "Sibling Conflict": {
    "1-2": {
      whatToSay: '"Gentle hands. We share."',
      whatToDo: "Physically separate and redirect — no verbal reasoning at this age. Action first.",
      whatToTry: "Set up parallel play with identical toys to reduce competition.",
      activity: "Put on a favorite song and have everyone dance — it resets the whole mood.",
      calmingAction: "Intervene without taking sides. You being the calm IS the intervention.",
    },
    "3-4": {
      whatToSay: '"I hear two unhappy kids. Let\'s find out what happened."',
      whatToDo: "Listen to each child briefly. Validate both feelings. Help them find a solution together.",
      whatToTry: 'Use a "talking stick" — only the one holding it can speak.',
      activity: "Cooperative building — a block tower both must help build together.",
      calmingAction: "Group hug when calm — rebuilds connection after the conflict.",
    },
    "5-6": {
      whatToSay: '"You both matter here. Let\'s solve this together."',
      whatToDo: "Coach them through problem-solving rather than solving it for them.",
      whatToTry: "Write or draw the problem and 3 possible solutions. Pick one together.",
      activity: "Team challenge — can both of you clean up 20 things in 2 minutes?",
      calmingAction: "Each person says one thing they like about the other. You start.",
    },
    "7-8": {
      whatToSay: '"Arguments happen. The goal is to repair, not to win."',
      whatToDo: "Give each child space first, then bring together for structured problem-solving.",
      whatToTry: '"I feel ___ when ___ because ___." — teach the feelings formula.',
      activity: "Play a cooperative game where they need each other to win.",
      calmingAction: "Individual alone time first, then the repair conversation.",
    },
  },
};

export const CALM_SCENARIOS: CalmKey[] = [
  "Meltdown / Tantrum",
  "Hitting or Biting",
  "Separation Anxiety",
  "Sleep Resistance",
  "Sibling Conflict",
];

export function getCalmResult(scenario: CalmKey, ageRange: AgeRange): CalmResult {
  return calmData[scenario][ageRange];
}

const activities: ActivityResult[] = [
  {
    title: "Sensory Cloud Dough",
    materials: ["2 cups flour", "1/4 cup baby oil", "Food coloring (optional)"],
    steps: [
      "Mix flour and baby oil in a large bowl until crumbly and soft.",
      "Add a drop of food coloring if desired and mix through.",
      "Let your child squish, shape, and mold the dough freely.",
      "Build animals, food, or anything they imagine.",
      "Store in an airtight container for up to a week.",
    ],
    whyItWorks:
      "Sensory play activates the nervous system in a calming way. The tactile input helps regulate big emotions and builds focus.",
  },
  {
    title: "Backyard Treasure Hunt",
    materials: ["Small objects to hide", "A basket or bag", "Optional: simple drawn map"],
    steps: [
      "Hide 5-8 small objects around the yard or room.",
      "Give your child the basket and a starting clue.",
      "Celebrate each discovery with big cheers.",
      "Count all the treasures at the end.",
      "Optional: let them hide items for you next round.",
    ],
    whyItWorks:
      "Treasure hunts build problem-solving skills and give children a sense of mastery and accomplishment.",
  },
  {
    title: "Kitchen Science: Baking Soda Volcano",
    materials: ["Baking soda", "White vinegar", "A bowl", "Food coloring", "Dish soap (optional)"],
    steps: [
      "Place a few tablespoons of baking soda in the bowl.",
      "Add a squeeze of dish soap and a few drops of food coloring.",
      "Let your child pour in the vinegar and watch the eruption.",
      "Talk about what's happening — 'look at those bubbles!'",
      "Reset and repeat as many times as they want.",
    ],
    whyItWorks:
      "Cause-and-effect play builds scientific thinking and satisfies curiosity. Repetition is deeply satisfying for young children.",
  },
  {
    title: "Story Stones",
    materials: ["Smooth stones or cardboard circles", "Markers or paint", "A bag or box"],
    steps: [
      "Draw simple pictures on each stone: sun, tree, house, cat, rainbow.",
      "Put all the stones in the bag and shake it up.",
      "Take turns drawing a stone and adding it to an ongoing story.",
      "The sillier the story gets, the better.",
      "Try to end with everyone living happily ever after.",
    ],
    whyItWorks:
      "Storytelling builds language, sequencing skills, and imagination. Taking turns develops cooperation.",
  },
  {
    title: "Cardboard Box City",
    materials: ["Cardboard boxes (any size)", "Markers", "Tape", "Toy cars or figures"],
    steps: [
      "Cut and tape boxes to make buildings, bridges, and roads.",
      "Draw windows, doors, and roads with markers.",
      "Populate your city with toy cars, animals, or figures.",
      "Make up stories about who lives there.",
      "Knock it all down at the end — the best part.",
    ],
    whyItWorks:
      "Construction play develops spatial reasoning and planning. Open-ended play builds creativity and resilience.",
  },
  {
    title: "Freeze Dance Party",
    materials: ["Music (any device)", "Space to move"],
    steps: [
      "Play your child's favorite upbeat song.",
      "Dance freely together — sillier is better.",
      "Pause the music randomly and freeze like statues.",
      "Hold the pose until the music starts again.",
      "Try slow-motion dancing during quiet parts.",
    ],
    whyItWorks:
      "Physical movement discharges energy and boosts mood instantly. Stop-and-go play builds self-regulation skills.",
  },
  {
    title: "Nature Collage",
    materials: ["Paper or cardboard", "Glue stick", "Leaves, twigs, petals, rocks from outside"],
    steps: [
      "Take a 5-minute walk to collect natural materials.",
      "Lay everything out on the table to sort and explore.",
      "Glue pieces to paper to create a nature scene or abstract art.",
      "Name each piece as they place it.",
      "Let it dry and display it somewhere special.",
    ],
    whyItWorks:
      "Nature connection reduces cortisol and builds mindful attention. Creating art gives children a sense of pride and completion.",
  },
  {
    title: "Quiet Book Corner",
    materials: ["3-5 picture books", "Cozy blanket", "Optional: flashlight for atmosphere"],
    steps: [
      "Build a cozy reading nest with pillows and a blanket.",
      "Let your child choose the books.",
      "Read with slow, expressive voices — change character voices.",
      "Pause to ask 'what do you think happens next?'",
      "End with one favorite page they pick.",
    ],
    whyItWorks:
      "Reading together strengthens attachment, builds language, and transitions the nervous system into a calm, connected state.",
  },
];

export function getActivity(energy: string, context: string, time: string): ActivityResult {
  const seed = energy.length + context.length + time.length;
  return activities[seed % activities.length];
}

const stories: Record<string, Record<string, StoryResult>> = {
  Animals: {
    Wired: {
      title: "The Sleepy Bunny's Big Day",
      body: `Once upon a time, in a soft green meadow, there lived a little bunny named {{name}}.

{{name}} had the most wonderful day — hopping through clover, chasing butterflies, and splashing in the stream. By the time the sun turned gold and soft, {{name}}'s little legs were beautifully tired.

Mama bunny called from the burrow: "Time to come home, little one."

{{name}} hopped slowly, slowly, slowly back — each hop softer than the last.

Inside the burrow, it was warm and smelled like hay. Mama tucked {{name}} under a soft leaf blanket and said, "You were so brave and so wonderful today."

{{name}}'s eyes grew heavy. The meadow sounds drifted far, far away.

And just like that, with a tiny sigh and a peaceful smile... {{name}} drifted into the sweetest sleep. 🌙`,
    },
    Tired: {
      title: "Hedgehog Finds the Moon",
      body: `Little Hedgehog {{name}} rolled through the forest as the stars began to appear, one by one.

"Where are you going?" whispered the owl.
"I'm following the moon," said {{name}} quietly.

The moon led {{name}} past the tall oak, past the glowing mushrooms, past the sleeping fox... until finally it led straight to a cozy hollow log filled with soft leaves.

"This is for you," the moon seemed to say.

{{name}} curled up in a perfect ball, nose tucked under a little paw. The forest breathed in and out, in and out.

The moon kept watch all night long.

And {{name}} slept, and slept, and slept. 🌙`,
    },
    Calm: {
      title: "The Owl Who Counted Stars",
      body: `High up in the old oak tree, a small owl named {{name}} sat perfectly still.

The night was quiet. The moon was full and round.

"I'm going to count every star," {{name}} decided.

One... two... three... four...

The stars were so many and so beautiful.

Five... six... seven...

{{name}}'s eyes grew slow and soft.

Eight... nine...

The wings folded in. The head nodded gently.

And somewhere around ten... {{name}} gave up counting and simply rested, wrapped in the darkness and the stars and the perfect peace of night. 🌙`,
    },
  },
  Magic: {
    Wired: {
      title: "The Magic Star That Brought Sleep",
      body: `In the kingdom beyond the clouds, there was a special child named {{name}} — the bravest, most wonderful child in all the realm.

One evening, a tiny star flew down from the sky and landed softly on {{name}}'s pillow.

"I was sent just for you," the star whispered. "I carry sleeping magic from the moon."

{{name}} held the star gently. It was warm, like a hug.

"Close your eyes," the star said softly, "and I'll travel with you to the dream lands."

{{name}} took one long, slow breath. Then another.

The star glowed softly... softly... softly...

And together they drifted away — into a warm, golden dream that lasted all night long. 🌙`,
    },
    Tired: {
      title: "The Wish Cloud",
      body: `Every night, a soft pink cloud drifted past the window — the Wish Cloud.

If you caught it with a whisper, it would carry your wish all the way to Dreamland.

Tonight, {{name}} leaned close to the window and whispered very quietly: "I wish for the most peaceful sleep."

The cloud paused. It glowed softly pink.

Then it wrapped around {{name}}'s room like a warm blanket, filling every corner with quiet and calm.

{{name}} felt very, very heavy — in the best possible way.

The Wish Cloud stayed all night, keeping guard.

Nothing could disturb that sleep. Not even a single sound. 🌙`,
    },
    Calm: {
      title: "The Sleeping Spell",
      body: `The wise old wizard called all the children to the enchanted meadow at moonrise.

"Tonight," said the wizard, "I will teach you the most powerful spell of all."

{{name}} listened very carefully.

"The spell has only three parts," the wizard whispered.

"Close your eyes. Breathe in slowly... and let everything go."

{{name}} tried it.

Eyes closed.
Slow breath in...
Let everything go.

The meadow disappeared. The wizard disappeared. The whole world went soft and quiet.

And {{name}} discovered that sleep is the most powerful magic of all. 🌙`,
    },
  },
  Adventure: {
    Wired: {
      title: "The Explorer Who Found Home",
      body: `Explorer {{name}} had sailed seven seas, crossed three deserts, and climbed the tallest mountain in the world.

But by evening, the boat was moored. The tent was pitched. The fire had burned down to soft red coals.

"Where to next?" {{name}}'s companion asked.

"Home," said {{name}} quietly.

Because after every adventure — no matter how grand — there is nothing better than a warm bed, a familiar ceiling, and the sound of gentle breathing.

{{name}} climbed into the sleeping bag. The stars appeared one by one above the tent.

The whole world went still.

And the bravest explorer fell into the deepest, most deserved sleep. 🌙`,
    },
    Tired: {
      title: "The Secret Map to Dreamland",
      body: `In {{name}}'s bedside drawer was a secret map.

It had been there all along, but tonight was the right night to use it.

The map showed a winding path: through the pillow mountains, past the blanket forest, through the warm golden valley...

...and right into Dreamland.

{{name}} followed every step carefully. Each step felt heavier and softer than the last.

The pillow mountains were so soft. The blanket forest smelled like home. The golden valley hummed a quiet lullaby.

And at the very end of the path — a perfect resting spot.

{{name}} lay down. The map folded itself closed.

Tomorrow's adventure could wait. 🌙`,
    },
    Calm: {
      title: "The Night Sailor",
      body: `Every night, {{name}} became the Night Sailor — captain of a small wooden boat that sailed the dream sea.

The sea was always calm at this hour.

The stars reflected in the water like a thousand tiny lanterns.

{{name}} steered slowly, slowly — there was nowhere to rush.

The boat rocked gently: forward... back... forward... back...

Like breathing.

Like heartbeats.

Like being rocked by someone who loves you very much.

The Night Sailor's eyes grew soft. The stars blurred into soft light.

And the boat sailed on quietly, carrying {{name}} safely into the deepest part of sleep. 🌙`,
    },
  },
  Friendship: {
    Wired: {
      title: "Two Bears and the Very Good Night",
      body: `Bear {{name}} and Bear Boo had the most wonderful, wild, glorious day together.

They built a fort. They found a frog. They counted clouds and ate sandwiches upside-down.

By evening, Bear Boo had to go home.

"Tomorrow?" Boo asked at the door.

"Tomorrow," promised {{name}}.

{{name}} climbed the stairs slowly, each step a little heavier than the last.

The bed was waiting. The pillow was perfect.

{{name}} thought of all the good things from the day — the fort, the frog, the upside-down sandwiches...

And the thinking turned to dreaming before {{name}} even noticed. 🌙`,
    },
    Tired: {
      title: "The Goodnight Hug",
      body: `Before sleep, {{name}} gave goodnight hugs to everyone.

To the stuffed elephant — squeeze.
To the pillow — pat.
To the blanket — tuck in.
To the moonlight on the ceiling — a little wave.

Then {{name}} got the biggest goodnight hug of all — warm and safe and real.

"I love you to the moon," someone said.
"And back," {{name}} whispered.

And that was enough. That was everything.

{{name}} closed both eyes and held the warmth of the hug close, like a lantern.

It stayed all night long. 🌙`,
    },
    Calm: {
      title: "Penelope the Firefly",
      body: `Little Penelope the firefly had one very important job each night: she flew from window to window, checking on all the sleeping children.

When she came to {{name}}'s window, she hovered softly.

{{name}} was nestled in, breathing slowly. Already at peace.

Penelope blinked once — which in firefly means "you are safe."
She blinked again — which means "you are loved."
And once more — which means "sleep well."

Then she flew on into the dark, carrying light wherever she went.

And {{name}} slept all night, wrapped in the quiet glow of those three small blinks. 🌙`,
    },
  },
  Nature: {
    Wired: {
      title: "The River That Never Hurries",
      body: `{{name}} sat by the river at the end of the long, full day.

The river was never in a hurry. It moved at exactly the right speed — slow enough to reflect the sky, fast enough to keep going.

"Where are you going?" {{name}} asked.

"To the sea," the river said. "But not tonight. Tonight I rest."

{{name}} watched the water grow darker and quieter as the sun dipped low.

A frog said goodnight. A heron stood still like a dream.

{{name}} felt something settle — deep in the chest — like the river itself was moving through them, carrying the day away.

Slowly... slowly... toward the sea. Toward sleep. 🌙`,
    },
    Tired: {
      title: "Rain on Leaves",
      body: `When {{name}} closed both eyes, the sound of rain arrived.

It came from nowhere and everywhere — soft, steady rain falling on big green leaves.

Tap... tap... tap.

Each drop said something different: rest... rest... rest.

The smell of wet earth drifted through the dark. Cool and clean.

{{name}}'s breathing matched the rain — slow in, slow out.

The whole world outside was drinking and settling and resting.

And {{name}} rested too — held by the sound of a thousand tiny drops, each one a small lullaby. 🌙`,
    },
    Calm: {
      title: "Under the Great Oak",
      body: `The great oak tree had stood for one hundred years. It had seen storms and sunshine and everything between.

Tonight, {{name}} curled up among its roots — the safest place in the whole forest.

The roots were worn smooth and warm. The bark smelled like earth and time.

Above, the leaves made the sound they always make at night — a soft shushing, like they're telling the whole world to be quiet now.

Shhh... shhh... shhh.

{{name}} felt very small and very held at the same time.

Small like a seed.
Safe like something that had been growing all along.

The oak kept watch, as it always had.

And {{name}} slept. 🌙`,
    },
  },
};

export const STORY_THEMES = Object.keys(stories) as Array<keyof typeof stories>;
export const STORY_ENERGIES = ["Wired", "Tired", "Calm"] as const;

export function getStory(theme: string, energy: string, childName: string): StoryResult {
  const t = stories[theme] ?? stories["Animals"];
  const e = t[energy] ?? t["Calm"];
  return {
    title: e.title,
    body: e.body.replace(/\{\{name\}\}/g, childName || "Little One"),
  };
}

export interface Routine {
  name: string;
  icon: string;
  steps: RoutineStep[];
}

export const ROUTINES: Routine[] = [
  {
    name: "Morning Chaos",
    icon: "sun",
    steps: [
      {
        action: "Wake with connection",
        script: '"Good morning, sunshine. I\'m so glad to see you today."',
      },
      {
        action: "Offer two choices for getting up",
        script: '"Do you want to hop out of bed or do a big stretch first?"',
      },
      {
        action: "Bathroom first, together",
        script: '"Let\'s go brush those teeth — I\'ll race you!"',
      },
      {
        action: "Clothes on — their choice",
        script: '"You pick — the blue shirt or the stripe one? You\'re the boss of your outfit."',
      },
      {
        action: "Breakfast — simple and consistent",
        script: '"Your favorite seat is waiting. Come eat so your body has energy."',
      },
      {
        action: "Pack bag the night before (remind)",
        script: '"We packed everything last night — your bag is ready by the door."',
      },
      {
        action: "Out the door with warmth",
        script: '"You\'re going to have a wonderful day. I love you so much."',
      },
    ],
  },
  {
    name: "Bedtime",
    icon: "moon",
    steps: [
      {
        action: "Give a 10-minute warning",
        script: '"Ten more minutes, then we start getting ready for bed."',
      },
      {
        action: "Bath or wash up",
        script: '"Time to wash the day off. You can pick one bath toy tonight."',
      },
      {
        action: "Pajamas and brush teeth",
        script: '"PJs on, teeth brushed — you\'re doing such a good job."',
      },
      {
        action: "One story or quiet reading",
        script: '"Climb in — let\'s read our story together."',
      },
      {
        action: "Lights dimmed, connection check-in",
        script: '"What was one good thing about today? I\'ll share mine too."',
      },
      {
        action: "Final tuck-in",
        script: '"I love you. You are safe. Sleep will come. I\'m right here."',
      },
      {
        action: "Leave with consistency",
        script: '"Goodnight. See you in the morning." — same words every time.',
      },
    ],
  },
  {
    name: "Hangry Time",
    icon: "zap",
    steps: [
      {
        action: "Acknowledge first, solve second",
        script: '"I can see you\'re really hungry. Let\'s fix that right now."',
      },
      {
        action: "Offer food immediately — no negotiating",
        script: '"Here\'s a snack to start while I make the rest."',
      },
      {
        action: "Keep it simple",
        script: '"Cheese and crackers? Coming right up. No waiting."',
      },
      {
        action: "Lower all demands while hungry",
        script: "No homework, no screens, no big conversations. Eating comes first.",
      },
      {
        action: "Sit together while they eat",
        script: '"Tell me about your day — or just eat. Both are totally fine."',
      },
      {
        action: "Check in after eating",
        script: '"Feeling better? Good. Your body needed that."',
      },
    ],
  },
];

const breathResults: BreathResult[] = [
  {
    validation: "What you're feeling right now is completely real, and you don't have to pretend it isn't.",
    groundingAction: "Press your feet flat on the floor. Feel the ground holding you up. You are supported.",
    childActivity: "Have your child trace their hand slowly on paper while breathing in and out with each finger.",
  },
  {
    validation: "There is no such thing as a perfect parent. The fact that you're here means you're trying.",
    groundingAction: "Place both hands on your heart. Take three slow breaths into your hands. You are enough.",
    childActivity: "Ask your child to squeeze a stuffed animal as tight as they can, then let go completely. Repeat 3 times.",
  },
  {
    validation: "You are doing so much more than you give yourself credit for. This moment will pass.",
    groundingAction: "Look around and name 3 things you can see. Breathe. You are here, and you are okay.",
    childActivity: "Blow imaginary birthday candles — breathe in big, blow out slow. Count 5 candles together.",
  },
  {
    validation: "Hard moments don't make you a bad parent. They make you a human one.",
    groundingAction: "Sit down if you can. Take one long, slow breath out — longer than the in-breath.",
    childActivity: "Do 'noodle arms' together — shake arms loose and floppy until you both giggle.",
  },
  {
    validation: "You are allowed to not have all the answers. Love is enough right now.",
    groundingAction: "Step outside or open a window. Take one breath of fresh air. Reset.",
    childActivity: "Hum the same simple song together — matching breath and sound calms nervous systems quickly.",
  },
  {
    validation: "The fact that this feels hard means you care deeply. That caring is love in action.",
    groundingAction: "Drop your shoulders away from your ears. Unclench your jaw. You've got this.",
    childActivity: "Play 'statue' — freeze in the silliest pose, hold it, then melt to the floor like ice cream.",
  },
];

export function getBreathResult(): BreathResult {
  return breathResults[Math.floor(Math.random() * breathResults.length)];
}
