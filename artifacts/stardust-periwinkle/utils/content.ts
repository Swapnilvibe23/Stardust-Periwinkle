import { AgeRange } from "@/contexts/ChildContext";

export interface CalmResult {
  whatToSay: string;
  whatToDo: string;
  whatToTry: string;
  activity: string;
  calmingAction: string;
}

export interface ActivityResult {
  id: string;
  title: string;
  materials: string[];
  steps: string[];
  whyItWorks: string;
  ageRanges: AgeRange[];
  energyLevels: string[];
  contexts: string[];
  timeMins: number;
}

export interface StoryResult {
  title: string;
  body: string;
  readingNote: string;
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

export interface Routine {
  name: string;
  icon: string;
  steps: RoutineStep[];
}

// ─────────────────────────────────────────────
// CALM THIS MOMENT
// 2 variations per scenario × age range
// ─────────────────────────────────────────────

type CalmKey =
  | "Meltdown / Tantrum"
  | "Hitting or Biting"
  | "Separation Anxiety"
  | "Sleep Resistance"
  | "Sibling Conflict";

const calmData: Record<CalmKey, Record<AgeRange, CalmResult[]>> = {
  "Meltdown / Tantrum": {
    "1-2": [
      {
        whatToSay: '"I see you. I\'m right here with you."',
        whatToDo:
          "Get down to their level. Keep your voice soft and slow. Avoid talking too much — stay close and breathe.",
        whatToTry:
          "Offer a comfort item (stuffed animal, blanket). Create a safe, small space like a floor corner with pillows.",
        activity: "Slow rocking or swaying together while humming a familiar song.",
        calmingAction: "Take 3 deep belly breaths yourself — your calm transfers to them.",
      },
      {
        whatToSay: '"You\'re safe. I\'ve got you."',
        whatToDo:
          "Don't try to reason or fix it yet. Sit on the floor near them and stay quiet. Let your presence do the work.",
        whatToTry:
          "Hum or sing a familiar tune very softly. Familiar sounds anchor young children quickly.",
        activity: "Pat their back gently in a slow, rhythmic beat — like a heartbeat.",
        calmingAction:
          "Relax your shoulders. Soften your jaw. Your body language speaks before your words do.",
      },
    ],
    "3-4": [
      {
        whatToSay: '"It\'s okay to feel big feelings. I\'m staying right here with you."',
        whatToDo:
          "Don't reason during the meltdown. Stay nearby without crowding. Offer a hug when they're ready.",
        whatToTry:
          "Redirect to a calm corner with a stuffed animal. Wait for the storm to pass before talking.",
        activity: "Blow bubbles together — the deep breaths are built right in.",
        calmingAction: "Place your hand gently on their back if they allow it. Your presence is the co-regulation.",
      },
      {
        whatToSay: '"That feeling is too big right now. Let\'s find a safe place for it."',
        whatToDo:
          'Offer two physical choices: "Do you want to stomp your feet or squeeze this pillow?" Give them a safe outlet before talking.',
        whatToTry:
          "Use a calming jar (a sealed bottle with glitter in water) — shaking it and watching it settle mirrors what happens in the brain.",
        activity:
          "\"Stomp the grumps out\" — stomp feet together in a circle 10 times, then collapse on the floor dramatically.",
        calmingAction: "Match their breathing pace, then slowly breathe slower — they will often follow without realizing.",
      },
    ],
    "5-6": [
      {
        whatToSay: '"That feeling is really big right now. You don\'t have to hold it alone."',
        whatToDo: "Give them space but stay visible. Validate the emotion without fixing it right away.",
        whatToTry: 'Try a body scan together — "squeeze your hands tight, then let go… now your feet…"',
        activity: 'Draw the feeling together: "What color is the mad? What shape is it?"',
        calmingAction: "Five finger breathing — trace each finger slowly while breathing in and out.",
      },
      {
        whatToSay: '"You\'re allowed to be upset. Let\'s figure out what your body needs."',
        whatToDo:
          "Name the feeling out loud for them: 'You look really frustrated.' Accurate naming actually reduces emotional intensity.",
        whatToTry:
          "Try 'butterfly hugs' — cross arms over chest and alternate gentle taps on each shoulder. It's a bilateral stimulation technique that calms the nervous system.",
        activity:
          "Scribble page — give them paper and let them scribble as hard and fast as they want. Then tear it up together.",
        calmingAction: "Say 'I feel it with you' and take one slow breath. Just one.",
      },
    ],
    "7-8": [
      {
        whatToSay: '"I can see this is really hard. Let\'s figure it out together when you\'re ready."',
        whatToDo: "Respect their need for space but check in gently. Avoid lecturing until they're calm.",
        whatToTry: "Offer a walk or some physical movement to discharge the big energy.",
        activity: "Journaling or drawing — helps process without needing to talk yet.",
        calmingAction: "4-7-8 breathing: breathe in 4 counts, hold for 7, out for 8.",
      },
      {
        whatToSay: '"You don\'t have to explain it right now. Just let me be here."',
        whatToDo:
          "Resist the urge to problem-solve immediately. Being heard reduces the meltdown faster than having answers.",
        whatToTry:
          "\"Window of tolerance\" check: on a scale of 1–10, how big does the feeling feel? This helps them self-observe and usually de-escalates.",
        activity:
          "Cold water reset — splash cold water on their face or hold ice cubes briefly. It physiologically activates the calm response.",
        calmingAction:
          "Box breathing — 4 counts each: breathe in, hold, out, hold. Do it visibly yourself first.",
      },
    ],
  },

  "Hitting or Biting": {
    "1-2": [
      {
        whatToSay: '"Ouch. We don\'t hit. I know you\'re really frustrated."',
        whatToDo: "Block calmly, don't overreact. Move them gently away and keep a neutral, steady tone.",
        whatToTry: "Give them something safe to squeeze or chew — teether, stress ball, or a soft pillow to pound.",
        activity: 'Redirect to patting a stuffed toy "gently, gently" — practicing gentle hands.',
        calmingAction: "Hum or sing softly — tone regulation helps regulate their nervous system too.",
      },
      {
        whatToSay: '"Gentle hands. Bodies are for being safe."',
        whatToDo:
          "Say it once, calmly. Then physically guide their hands to do something gentle — petting a toy, patting the floor softly.",
        whatToTry: "Offer a chewable toy or something with texture. Often hitting comes from sensory overwhelm at this age.",
        activity: "Hand massage together — press, squeeze, rub each finger while saying 'gentle, gentle.'",
        calmingAction: "Lower your voice to almost a whisper. Softness is contagious.",
      },
    ],
    "3-4": [
      {
        whatToSay: '"Bodies are for being safe. Hitting hurts. Let\'s find another way to show how you feel."',
        whatToDo: "Stay calm. Give a brief acknowledgment and redirect. Don't shame — just redirect.",
        whatToTry: 'Teach them to stomp their feet, squeeze a pillow, or shout "I\'m SO mad!" into a pillow.',
        activity: "Rip paper together — safe physical release. Then throw it in the bin together.",
        calmingAction: 'Model slow breathing. Say "Watch me. Let\'s try together."',
      },
      {
        whatToSay: '"I won\'t let you hurt. And I won\'t let you be hurt. Let\'s find a safe way."',
        whatToDo:
          "Get eye-level. Say it plainly without anger. Then immediately offer the alternative: 'Hit this pillow instead.'",
        whatToTry:
          "Create a 'mad menu' of 3 safe things they can do when hitting urge strikes: stomp, squeeze, shout into pillow.",
        activity: "Punch dough — make playdough and punch it together as many times as they want.",
        calmingAction: "Breathe out loudly together — 'haaaaa.' Sometimes a silly exhale breaks the tension.",
      },
    ],
    "5-6": [
      {
        whatToSay: '"I won\'t let you hurt others or yourself. Let\'s find what you need right now."',
        whatToDo: "Remove from the situation briefly. Be clear: the behavior isn't okay, but the feelings are.",
        whatToTry: 'Create a "safe ways to be mad" list together — something they help build.',
        activity: "Punch a pillow together — model it with them to show it's okay to feel angry.",
        calmingAction: 'Shake hands, then arms, then whole body — "shake the mad out!"',
      },
      {
        whatToSay: '"That feeling in your body needed somewhere to go. Let\'s find the right place for it."',
        whatToDo:
          "Don't lecture during the heat of it. After the behavior stops, say: 'I can see you were overwhelmed. That makes sense.'",
        whatToTry:
          "Teach the Stop-Breathe-Think sequence: 'Before we act on a big feeling, we stop, breathe once, then think of a better choice.'",
        activity: "Wall push-ups — push against the wall hard, 10 times. Provides strong proprioceptive input that calms the body.",
        calmingAction:
          "Say: 'I'm not mad at you. I'm with you.' And mean it. Your tone is the medicine.",
      },
    ],
    "7-8": [
      {
        whatToSay: '"I get it, you\'re really angry. Let\'s talk about it when we\'re both calm."',
        whatToDo: "Address the behavior matter-of-factly. Don't escalate with your own emotion.",
        whatToTry: '"What could you do next time instead?" — problem-solve together once calm.',
        activity: "Go outside and run, do jumping jacks, or kick a ball around together.",
        calmingAction: "Box breathing — 4 counts each: in, hold, out, hold.",
      },
      {
        whatToSay: '"Hitting tells me something really big is happening inside. I want to understand."',
        whatToDo:
          "After safety is restored, use curiosity not punishment: 'Walk me through what happened right before this.'",
        whatToTry:
          "Introduce the body map — draw an outline of a person, ask them to color where they feel different emotions. Builds body awareness.",
        activity: "Intense physical activity — sprint, do 20 jumping jacks, or carry something heavy. Physical exertion metabolizes stress hormones.",
        calmingAction: "Drink cold water together, slowly. Physiological reset for both of you.",
      },
    ],
  },

  "Separation Anxiety": {
    "1-2": [
      {
        whatToSay: '"I love you. I\'ll be back. You\'re safe."',
        whatToDo: "Keep goodbyes short and consistent. Don't sneak away — a predictable routine builds trust.",
        whatToTry: "Create a simple goodbye ritual: one hug, one wave, one 'see you soon!'",
        activity: "Leave a photo of yourself or a piece of clothing with your scent.",
        calmingAction: "Trust the caregiver — lingering extends the distress. Go with love.",
      },
      {
        whatToSay: '"Bye-bye! Mama/Dada loves you SO much. See you soon!"',
        whatToDo:
          "Practice the same ritual every single time, no exceptions. Predictability is the entire intervention at this age.",
        whatToTry:
          "A 'hello/goodbye' book — a little board book with photos of you leaving and returning helps them understand the concept of return.",
        activity:
          "Wave from the window together if possible — give them the last visual of you before you're gone.",
        calmingAction:
          "Take a breath outside the door before you leave. Carrying guilt makes it harder for everyone.",
      },
    ],
    "3-4": [
      {
        whatToSay: '"I know it\'s hard when I go. I always come back. Every single time."',
        whatToDo: "Practice small separations. Acknowledge the feeling, then keep goodbyes brief.",
        whatToTry: 'Give them a "mama coin" or special object to hold until you return.',
        activity: '"When I come back, we can ___" — give them something to look forward to.',
        calmingAction: "Belly breathe together before separating — leave them on a calm breath.",
      },
      {
        whatToSay: '"Feeling sad when I go means you love me. That\'s a good thing. I love you too."',
        whatToDo:
          "Name the feeling before you leave, not after the crying starts: 'I know your heart might feel a little sad. That's normal and okay.'",
        whatToTry:
          "A simple countdown calendar — 'I'll be home after 5 sleeps.' Concrete time concepts reduce anxiety.",
        activity:
          "Matching items — they hold a small item (rock, button), you hold the matching one. 'We both have one. It connects us.'",
        calmingAction:
          "A specific, unique goodbye phrase just for you two — spoken the same way every time becomes an anchor.",
      },
    ],
    "5-6": [
      {
        whatToSay: '"Missing me means you love me. That\'s a wonderful thing."',
        whatToDo: "Validate feelings then redirect to the fun ahead. Co-regulate before separating.",
        whatToTry: "Draw a simple clock showing when you'll return — tangible timelines help.",
        activity: 'Make a "worry jar" — they write or draw worries and "store" them until you\'re back.',
        calmingAction: 'Press your palms together before leaving — "mama energy stays with you."',
      },
      {
        whatToSay: '"Your feelings make sense. And the good news: this feeling always passes."',
        whatToDo:
          "Teach them: 'Anxiety is like a wave — it gets big, then it always, always goes down.' Help them visualize the wave.",
        whatToTry:
          "A feelings plan — together, write: 'If I feel worried, I will ___.' Fill in 2–3 strategies they choose themselves.",
        activity: "A photo keychain of your family they can carry. Seeing faces releases oxytocin.",
        calmingAction:
          "A special handshake or goodbye sequence they helped create — ownership reduces anxiety.",
      },
    ],
    "7-8": [
      {
        whatToSay: '"Your feelings make complete sense. And I know you can handle this."',
        whatToDo: "Give them tools for managing the anxious feeling — not just reassurance.",
        whatToTry: "Create a coping card together: what to do when the worry shows up.",
        activity: "Write each other letters to read during separation time.",
        calmingAction: "5-4-3-2-1: Name 5 things they see, 4 they touch, 3 they hear, 2 smell, 1 taste.",
      },
      {
        whatToSay: '"The worry is lying to you. It says something bad will happen. It\'s wrong."',
        whatToDo:
          "Gently challenge the worried thought: 'What does the worry say will happen? Has that ever actually happened?' Build evidence against the anxiety.",
        whatToTry:
          "Teach the STOP technique: Stop, Take a breath, Observe what's actually true, Proceed with a plan.",
        activity:
          "A 'brave list' — write down things they've already done that were scary. Evidence of their courage.",
        calmingAction:
          "A specific coping mantra they chose themselves: something like 'I've done hard things. I can do this.'",
      },
    ],
  },

  "Sleep Resistance": {
    "1-2": [
      {
        whatToSay: '"Sleep time now. I love you. Night night."',
        whatToDo: "Stick to the same routine every night without variation. Predictability is the medicine.",
        whatToTry: "Dim lights 30 min before bed. No screens. Soft music or white noise in the background.",
        activity: "Gentle baby massage with lotion — lavender scent helps signal sleep time.",
        calmingAction: "Breathe slowly and deeply yourself while you hold them — your calm transfers.",
      },
      {
        whatToSay: '"Shhhh... time to rest, little one. I love you to the moon."',
        whatToDo:
          "Start the bedtime sequence at the same time every night. The body clock is real — consistent timing regulates it within days.",
        whatToTry:
          "A simple 3-step routine (bath → feed → sleep) done identically every night. Sequence matters more than duration.",
        activity: "Rock in a chair together for 5 minutes without screens. Vestibular input promotes sleep.",
        calmingAction: "Hum the same song every night — a consistent 'sleep cue' that their nervous system learns to respond to.",
      },
    ],
    "3-4": [
      {
        whatToSay: '"It\'s time for your body to rest. Even if your eyes don\'t close right away."',
        whatToDo: 'Offer two limited choices: "Bear or bunny tonight?" — giving control helps.',
        whatToTry: '"Make your toes sleepy, now your feet, now your legs…" — body scan up to the head.',
        activity: "One special bedtime story — same one each night for comfort and predictability.",
        calmingAction: "Hum or sing softly. Your voice is their anchor to safety.",
      },
      {
        whatToSay: '"Your body worked SO hard today. It deserves a rest. Let\'s tuck it in."',
        whatToDo:
          "Let them help with the routine: pull back the covers, choose the stuffed animal, turn off their own light. Ownership = cooperation.",
        whatToTry:
          "A visual bedtime chart they can follow themselves — check off each step. Independence reduces power struggles.",
        activity:
          "\"Goodnight to everything\" — say goodnight to each toy, each body part, the moon. Ritual creates sleepiness.",
        calmingAction: "Rub their back with circular strokes while they settle. Physical rhythm is regulating.",
      },
    ],
    "5-6": [
      {
        whatToSay: '"Your job right now is to rest your body — not to fall asleep right away."',
        whatToDo: "Keep the environment calm and boring. Boring equals sleepy.",
        whatToTry: 'Give them one "free pass" out of bed per night for a valid reason.',
        activity: "Quiet audiobook or soft music — gives the mind something gentle to follow.",
        calmingAction: '"Think of your happy place" — guide them through a simple visualization together.',
      },
      {
        whatToSay: '"Lying still with your eyes closed IS resting. That counts. You\'re doing it."',
        whatToDo:
          "Remove the pressure to 'fall asleep.' The anxiety of trying to sleep prevents sleep. Rest is the goal.",
        whatToTry:
          "Worry dump before bed — they tell you (or write) every thought in their head. Getting it out reduces nighttime rumination.",
        activity:
          "\"Magic countdown\" — count slowly backward from 20 together, imagining floating down into sleep with each number.",
        calmingAction: "Lavender pillow spray or diffuser — olfactory cues train the brain that sleep is coming.",
      },
    ],
    "7-8": [
      {
        whatToSay: '"I know you\'re not tired yet. Your body still needs the rest."',
        whatToDo: "Negotiate: 15 min quiet reading in bed is fine. Then lights out — no negotiation.",
        whatToTry: "Sleep hygiene they can own: no screens 1hr before, same bedtime, cool room.",
        activity: "Bedtime journal — brain dump before sleep clears the mental clutter.",
        calmingAction: "Progressive muscle relaxation — tense and release each body part systematically.",
      },
      {
        whatToSay: '"Sleep is when your brain actually grows. It\'s not a punishment — it\'s the superpower."',
        whatToDo:
          "Bring them into the science: explain why sleep matters for memory, growth, and sports/school performance. Kids this age respond to logic.",
        whatToTry:
          "A consistent wind-down routine THEY design: what 3 things do they want to do before sleep? Honor their list.",
        activity:
          "Gratitude practice — name 3 good things from the day. Ends on a positive emotional note, reduces anxious night-thinking.",
        calmingAction: "4-7-8 breathing: in for 4, hold for 7, out for 8. Repeat 3 times — almost always induces drowsiness.",
      },
    ],
  },

  "Sibling Conflict": {
    "1-2": [
      {
        whatToSay: '"Gentle hands. We share."',
        whatToDo: "Physically separate and redirect — no verbal reasoning at this age. Action first.",
        whatToTry: "Set up parallel play with identical toys to reduce competition.",
        activity: "Put on a favorite song and have everyone dance — it resets the whole mood.",
        calmingAction: "Intervene without taking sides. You being the calm IS the intervention.",
      },
      {
        whatToSay: '"We play gently. Everyone\'s turn."',
        whatToDo:
          "Separate first, redirect immediately. No explanations at this age — act, don't talk.",
        whatToTry: "Give each child a defined 'space' and set of toys. Boundary clarity prevents most conflicts at this age.",
        activity:
          "A simple shared sensory activity — water play, playdough — where there's enough for everyone.",
        calmingAction: "Deep breath, soft voice. Little ones absorb your energy faster than your words.",
      },
    ],
    "3-4": [
      {
        whatToSay: '"I hear two unhappy kids. Let\'s find out what happened."',
        whatToDo: "Listen to each child briefly. Validate both feelings. Help them find a solution together.",
        whatToTry: 'Use a "talking stick" — only the one holding it can speak.',
        activity: "Cooperative building — a block tower both must help build together.",
        calmingAction: "Group hug when calm — rebuilds connection after the conflict.",
      },
      {
        whatToSay: '"Two people, two feelings. Both matter. Let\'s sort this out."',
        whatToDo:
          "Sportscaster approach: narrate what you see without taking sides. 'It looks like you both wanted the same toy at the same time.'",
        whatToTry:
          "Coin flip for tough decisions — takes the decision out of everyone's hands and feels fair.",
        activity:
          "A 'sorry and repair' ritual: each child does one nice thing for the other (high five, compliment, shared snack).",
        calmingAction: "Breathe and remember: conflict is HOW kids learn social skills. Your job is to guide, not eliminate it.",
      },
    ],
    "5-6": [
      {
        whatToSay: '"You both matter here. Let\'s solve this together."',
        whatToDo: "Coach them through problem-solving rather than solving it for them.",
        whatToTry: "Write or draw the problem and 3 possible solutions. Pick one together.",
        activity: "Team challenge — can both of you clean up 20 things in 2 minutes?",
        calmingAction: "Each person says one thing they like about the other. You start.",
      },
      {
        whatToSay: '"Arguments are normal. The goal isn\'t to avoid them — it\'s to solve them well."',
        whatToDo:
          "Teach the difference between tattling (telling to get someone in trouble) and reporting (telling to keep someone safe). Reduces unnecessary escalation.",
        whatToTry:
          "\"I need\" statements: each child finishes 'In this situation, what I need is ___.' Helps identify the real underlying need.",
        activity:
          "Plan something together: what can you two do this weekend that you'd both like? Shared future focus repairs the present.",
        calmingAction:
          "Remind yourself: sibling relationships are the longest relationships of their lives. Every repair is practice.",
      },
    ],
    "7-8": [
      {
        whatToSay: '"Arguments happen. The goal is to repair, not to win."',
        whatToDo: "Give each child space first, then bring together for structured problem-solving.",
        whatToTry: '"I feel ___ when ___ because ___." — teach the feelings formula.',
        activity: "Play a cooperative game where they need each other to win.",
        calmingAction: "Individual alone time first, then the repair conversation.",
      },
      {
        whatToSay: '"How this fight ends matters more than who started it."',
        whatToDo:
          "Hold a brief 'family court' — each person gets 2 uninterrupted minutes to state their case. Then you summarize both sides without judgment.",
        whatToTry:
          "Negotiate: each person gives up one thing, each person gets one thing. Practice real compromise.",
        activity:
          "A shared \"relationship account\" — a jar they put marbles in when they do something kind for each other, remove one when they hurt each other. Visual relationship health.",
        calmingAction: "Ask them separately: 'What would make this better?' Often kids already know the answer.",
      },
    ],
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
  const options = calmData[scenario][ageRange];
  return options[Math.floor(Math.random() * options.length)];
}

// ─────────────────────────────────────────────
// ACTIVITIES — with IDs, age ranges, and filters
// ─────────────────────────────────────────────

const activities: ActivityResult[] = [
  {
    id: "sensory-cloud-dough",
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
    ageRanges: ["1-2", "3-4", "5-6"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors", "Quiet space"],
    timeMins: 20,
  },
  {
    id: "backyard-treasure-hunt",
    title: "Treasure Hunt",
    materials: ["Small objects to hide", "A basket or bag", "Optional: simple drawn map"],
    steps: [
      "Hide 5–8 small objects around the yard or room.",
      "Give your child the basket and a starting clue.",
      "Celebrate each discovery with big cheers.",
      "Count all the treasures at the end.",
      "Optional: let them hide items for you next round.",
    ],
    whyItWorks:
      "Treasure hunts build problem-solving skills and give children a sense of mastery and accomplishment.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Medium", "High"],
    contexts: ["Indoors", "Outdoors"],
    timeMins: 20,
  },
  {
    id: "baking-soda-volcano",
    title: "Kitchen Science Volcano",
    materials: ["Baking soda", "White vinegar", "A bowl", "Food coloring", "Dish soap (optional)"],
    steps: [
      "Place a few tablespoons of baking soda in the bowl.",
      "Add a squeeze of dish soap and a few drops of food coloring.",
      "Let your child pour in the vinegar and watch the eruption.",
      "Talk about what's happening — 'look at those bubbles!'",
      "Reset and repeat as many times as they want.",
    ],
    whyItWorks:
      "Cause-and-effect play builds scientific thinking. Repetition is deeply satisfying for young children.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors"],
    timeMins: 20,
  },
  {
    id: "story-stones",
    title: "Story Stones",
    materials: ["Smooth stones or cardboard circles", "Markers or paint", "A bag or box"],
    steps: [
      "Draw simple pictures on each stone: sun, tree, house, cat, rainbow.",
      "Put all the stones in the bag and shake it up.",
      "Take turns drawing a stone and adding it to an ongoing story.",
      "The sillier the story, the better.",
      "Try to end with everyone living happily ever after.",
    ],
    whyItWorks:
      "Storytelling builds language, sequencing skills, and imagination. Taking turns develops cooperation.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors", "Quiet space"],
    timeMins: 20,
  },
  {
    id: "cardboard-box-city",
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
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors"],
    timeMins: 30,
  },
  {
    id: "freeze-dance-party",
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
    ageRanges: ["1-2", "3-4", "5-6"],
    energyLevels: ["High", "Medium"],
    contexts: ["Indoors"],
    timeMins: 10,
  },
  {
    id: "nature-collage",
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
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Outdoors", "Indoors"],
    timeMins: 20,
  },
  {
    id: "book-corner",
    title: "Cozy Book Corner",
    materials: ["3–5 picture books", "Cozy blanket", "Optional: flashlight for atmosphere"],
    steps: [
      "Build a cozy reading nest with pillows and a blanket.",
      "Let your child choose the books.",
      "Read with slow, expressive voices — change character voices.",
      "Pause to ask 'what do you think happens next?'",
      "End with one favorite page they pick.",
    ],
    whyItWorks:
      "Reading together strengthens attachment, builds language, and transitions the nervous system into a calm state.",
    ageRanges: ["1-2", "3-4", "5-6"],
    energyLevels: ["Low"],
    contexts: ["Indoors", "Quiet space"],
    timeMins: 10,
  },
  {
    id: "obstacle-course",
    title: "Indoor Obstacle Course",
    materials: ["Pillows", "Chairs", "Blankets", "Tape for lines"],
    steps: [
      "Set up a course: crawl under the table, jump over pillows, balance on a tape line.",
      "Walk through the course once together to explain it.",
      "Time your child with a count-up (not competitive — just for fun).",
      "Let them redesign the course once they've done it.",
      "Add silliness: do it backward, in slow motion, as an animal.",
    ],
    whyItWorks:
      "Gross motor play burns energy and improves body awareness. Designing the course builds planning skills.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["High", "Medium"],
    contexts: ["Indoors"],
    timeMins: 20,
  },
  {
    id: "water-play",
    title: "Water Play Station",
    materials: ["Large bowl or bin", "Water", "Cups, spoons, toy boats", "Towel nearby"],
    steps: [
      "Fill a large bin with a few inches of water.",
      "Add cups, spoons, small toys, and anything waterproof.",
      "Let them pour, measure, splash, and explore freely.",
      "Optional: add a few drops of food coloring or dish soap for bubbles.",
      "Make it a 'science station' — what floats? What sinks?",
    ],
    whyItWorks:
      "Water play is one of the most calming activities for young children. The sensory input regulates the nervous system naturally.",
    ageRanges: ["1-2", "3-4", "5-6"],
    energyLevels: ["Low", "Medium", "High"],
    contexts: ["Indoors", "Outdoors"],
    timeMins: 20,
  },
  {
    id: "shadow-puppets",
    title: "Shadow Puppet Show",
    materials: ["Flashlight or phone torch", "Hands", "Optional: paper cutouts"],
    steps: [
      "Darken the room and shine a flashlight at the wall.",
      "Make simple animal shapes with your hands.",
      "Tell a simple story — a rabbit meets a dog, they become friends.",
      "Let your child add characters and change the story.",
      "Bow at the end. Applause required.",
    ],
    whyItWorks:
      "Creative play builds narrative thinking and imagination. The calm, quiet setup naturally lowers arousal levels.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low"],
    contexts: ["Indoors", "Quiet space"],
    timeMins: 10,
  },
  {
    id: "garden-planting",
    title: "Mini Garden Planting",
    materials: ["Small pot or cup", "Soil", "Seeds (beans, herbs, or flowers)", "Water"],
    steps: [
      "Fill the pot with soil together — let them pack it in.",
      "Make a small hole with a finger and drop in 2–3 seeds.",
      "Cover gently with soil and water lightly.",
      "Place by a window and name your plant.",
      "Check on it every day — make it a ritual.",
    ],
    whyItWorks:
      "Caring for a living thing builds responsibility and patience. The daily check-in gives children a reason to slow down and observe.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low"],
    contexts: ["Indoors", "Outdoors"],
    timeMins: 20,
  },
  {
    id: "scavenger-hunt-colors",
    title: "Color Scavenger Hunt",
    materials: ["A list of colors or objects", "Basket or bag"],
    steps: [
      "Call out a color — they have 30 seconds to find something that color.",
      "Bring it back and show you.",
      "Take turns calling colors.",
      "For older kids: find something round, something rough, something soft.",
      "End with 'find something that makes you happy.'",
    ],
    whyItWorks:
      "Observation-based play builds attention to detail and vocabulary. Simple games like this are great for transitions and energy resets.",
    ageRanges: ["1-2", "3-4", "5-6"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors", "Outdoors"],
    timeMins: 10,
  },
  {
    id: "art-project-open",
    title: "Open Art Project",
    materials: ["Paper", "Crayons, markers, or paint", "Stickers (optional)"],
    steps: [
      "Set out the supplies with no instructions — completely open.",
      "Sit nearby and do your own drawing.",
      "Ask 'tell me about your drawing' NOT 'what is that?'",
      "Add to it together if they invite you.",
      "Display it somewhere — fridge, window, their room.",
    ],
    whyItWorks:
      "Open-ended art develops creative confidence. Having no 'right answer' is deeply freeing and builds intrinsic motivation.",
    ageRanges: ["1-2", "3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors", "Quiet space"],
    timeMins: 20,
  },
  {
    id: "building-challenge",
    title: "Building Challenge",
    materials: ["Blocks, Lego, or household items (cans, boxes)"],
    steps: [
      "Set a challenge: 'Build the tallest tower you can.'",
      "Each round, add a new constraint: 'Now use only 10 pieces.'",
      "Time them for fun — 'how fast can you build a bridge?'",
      "Let them set a challenge for you.",
      "Knock it all down together at the end.",
    ],
    whyItWorks:
      "Engineering challenges build spatial reasoning, problem-solving, and frustration tolerance through low-stakes trial and error.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors"],
    timeMins: 20,
  },
  {
    id: "nature-walk-sensory",
    title: "Sensory Nature Walk",
    materials: ["Comfortable shoes", "Optional: magnifying glass or bag"],
    steps: [
      "Walk slowly — this is not exercise, it's exploration.",
      "Stop every minute to ask: 'what do you hear? see? feel?'",
      "Collect a few interesting things in the bag.",
      "Find one cloud and make up a story about it.",
      "End with: 'what was your favorite thing we found?'",
    ],
    whyItWorks:
      "Nature walks lower cortisol, improve focus, and create a natural mindfulness experience for children of all ages.",
    ageRanges: ["1-2", "3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Outdoors"],
    timeMins: 20,
  },
  {
    id: "baking-together",
    title: "Simple Baking Together",
    materials: ["Simple recipe ingredients", "Mixing bowls", "Measuring cups"],
    steps: [
      "Choose something simple: muffins, cookies, or banana bread.",
      "Give your child a specific job: pouring, stirring, pressing buttons.",
      "Talk through each step: 'now we add the flour — look how it falls.'",
      "Lick the bowl (safely) — this is part of the ritual.",
      "Eat together while it's still warm.",
    ],
    whyItWorks:
      "Cooking with children builds math skills, patience, and a sense of contribution. Sharing food deepens connection.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors"],
    timeMins: 30,
  },
  {
    id: "yoga-animals",
    title: "Animal Yoga",
    materials: ["A mat or carpet space"],
    steps: [
      "Call out an animal and do that pose together.",
      "Cat: on all fours, arch your back and meow.",
      "Tree: stand on one foot, arms like branches.",
      "Snake: lie flat and lift your chest, hiss.",
      "End with 'sleeping bear' — curl up on the floor and breathe.",
    ],
    whyItWorks:
      "Yoga builds body awareness, balance, and breath regulation in a playful format. The animal framing makes it accessible and fun for all ages.",
    ageRanges: ["3-4", "5-6", "7-8"],
    energyLevels: ["Low", "Medium"],
    contexts: ["Indoors", "Outdoors", "Quiet space"],
    timeMins: 10,
  },
];

function parseTime(time: string): number {
  if (time.includes("10")) return 10;
  if (time.includes("20")) return 20;
  if (time.includes("30")) return 30;
  if (time.includes("1 hour") || time.includes("60")) return 60;
  return 20;
}

export function getActivity(
  energy: string,
  context: string,
  time: string,
  recentIds: string[],
  ageRange?: AgeRange
): ActivityResult {
  const timeMins = parseTime(time);

  // Build candidate pool — filter by time and context
  let candidates = activities.filter((a) => {
    if (a.timeMins > timeMins) return false;
    if (context && !a.contexts.includes(context) && !a.contexts.includes("Indoors")) return false;
    return true;
  });

  // Narrow by energy (prefer matching, fall back to all)
  const byEnergy = candidates.filter(
    (a) => a.energyLevels.includes(energy) || a.energyLevels.includes("Any")
  );
  if (byEnergy.length >= 2) candidates = byEnergy;

  // Narrow by age range (soft filter — only apply if it meaningfully narrows)
  if (ageRange) {
    const byAge = candidates.filter((a) => a.ageRanges.includes(ageRange));
    if (byAge.length >= 2) candidates = byAge;
  }

  // Fall back to all activities if pool is too small
  if (candidates.length === 0) candidates = activities;

  // Exclude recently used ones, but fall back if pool gets too small
  const nonRecent = candidates.filter((a) => !recentIds.includes(a.id));
  const pool = nonRecent.length >= 2 ? nonRecent : candidates;

  return pool[Math.floor(Math.random() * pool.length)];
}

// ─────────────────────────────────────────────
// BEDTIME STORIES
// 2 templates per theme × energy level
// ─────────────────────────────────────────────

function ageReadingNote(ageRange?: AgeRange): string {
  if (ageRange === "1-2") return "Read very slowly in a soft, hushed voice. Repeat the last line twice.";
  if (ageRange === "3-4") return "Read slowly and quietly. Pause after each paragraph and breathe.";
  if (ageRange === "5-6") return "Use a gentle, low voice. Let the pauses do the work.";
  if (ageRange === "7-8") return "Read at a calm, even pace. Let the ending land with a moment of silence.";
  return "Read slowly and softly. Let the quiet do the work.";
}

const storyTemplates: Record<string, Record<string, StoryResult[]>> = {
  Animals: {
    Wired: [
      {
        title: "The Sleepy Bunny's Big Day",
        body: `Once upon a time, in a soft green meadow, there lived a little bunny named {{name}}.

{{name}} had the most wonderful day — hopping through clover, chasing butterflies, and splashing in the stream.

By the time the sun turned gold and soft, {{name}}'s little legs were beautifully tired.

Mama bunny called from the burrow: "Time to come home, little one."

{{name}} hopped slowly, slowly, slowly back — each hop softer than the last.

Inside the burrow, it was warm and smelled like hay. Mama tucked {{name}} under a soft leaf blanket.

"You were so brave and so wonderful today," Mama said.

{{name}}'s eyes grew heavy. The meadow sounds drifted far, far away.

And just like that, with a tiny sigh and a peaceful smile...

{{name}} drifted into the sweetest sleep. 🌙`,
        readingNote: "",
      },
      {
        title: "The Bear Who Counted Stars",
        body: `Little Bear {{name}} had run and roared and rolled down hills all day long.

Now the forest was quiet. The fireflies were blinking on one by one.

"I'm not tired," said {{name}}.

But then {{name}} sat down against the old oak tree. And felt how warm the bark was. And how soft the moss was underneath.

And how still the air was.

One firefly blinked. Then another.

{{name}} tried to count them. One... two... three...

The number got blurry. The forest hummed its nighttime song.

Four... five... fi...

And {{name}} was asleep before the sixth firefly even blinked. 🌙`,
        readingNote: "",
      },
    ],
    Tired: [
      {
        title: "Hedgehog Finds the Moon",
        body: `Little Hedgehog {{name}} rolled through the forest as the stars appeared, one by one.

"Where are you going?" whispered the owl.
"I'm following the moon," said {{name}} quietly.

The moon led {{name}} past the tall oak, past the glowing mushrooms, past the sleeping fox...

Until finally it led straight to a cozy hollow log filled with soft leaves.

"This is for you," the moon seemed to say.

{{name}} curled up in a perfect ball, nose tucked under a little paw.

The forest breathed in and out, in and out.

The moon kept watch all night long.

And {{name}} slept, and slept, and slept. 🌙`,
        readingNote: "",
      },
      {
        title: "The Fox and the Quiet River",
        body: `Little Fox {{name}} was very, very tired — but couldn't quite find the right place to rest.

Too bumpy. Too loud. Too bright.

Then {{name}} came to the river.

The river was dark and smooth and made a sound like: shhhhhhh.

{{name}} curled up on the soft bank.

The river said shhhhh.

The stars looked down.

The reeds leaned in like blankets.

{{name}}'s eyes went soft. And softer. And softer still.

And the river sang {{name}} all the way to sleep. 🌙`,
        readingNote: "",
      },
    ],
    Calm: [
      {
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
        readingNote: "",
      },
      {
        title: "The Tortoise's Quiet Evening",
        body: `Old Tortoise {{name}} moved very slowly — but tonight, even slower than usual.

The crickets were singing. The dew was falling on the grass blades one drop at a time.

{{name}} found a warm, flat stone and sat.

Breathed in.
Breathed out.

A moth landed nearby and stayed. The moth didn't seem to be going anywhere. Neither did {{name}}.

The moon moved slowly across the sky, the way moons do.

{{name}}'s eyes went heavy. The stone was warm. The night was still.

There was nowhere to go. Nothing to do.

Just this quiet, perfect moment — and then sleep. 🌙`,
        readingNote: "",
      },
    ],
  },

  Magic: {
    Wired: [
      {
        title: "The Magic Star That Brought Sleep",
        body: `In the kingdom beyond the clouds, there was a special child named {{name}} — the bravest, most wonderful child in all the realm.

One evening, a tiny star flew down from the sky and landed softly on {{name}}'s pillow.

"I was sent just for you," the star whispered. "I carry sleeping magic from the moon."

{{name}} held the star gently. It was warm, like a hug.

"Close your eyes," the star said softly, "and I'll travel with you to the dream lands."

{{name}} took one long, slow breath. Then another.

The star glowed softly... softly... softly...

And together they drifted away — into a warm, golden dream that lasted all night long. 🌙`,
        readingNote: "",
      },
      {
        title: "The Wizard's Quieting Spell",
        body: `{{name}} had raced through the enchanted forest all day, chasing dragons and crossing rivers and climbing the Impossible Mountain.

By nightfall, even the bravest adventurers must rest.

The old wizard appeared at the edge of the woods.

"Come," the wizard said softly. "I have something to show you."

In the center of the forest was a circle of soft silver light. Inside it: the coziest bed in all the world.

{{name}} lay down. The light wrapped around like a warm cloak.

"Sleep, brave one," the wizard whispered. "The quest will be there tomorrow. Tonight — only rest."

The enchanted forest held its breath.

And {{name}} was asleep before the wizard finished the spell. 🌙`,
        readingNote: "",
      },
    ],
    Tired: [
      {
        title: "The Wish Cloud",
        body: `Every night, a soft pink cloud drifted past the window — the Wish Cloud.

If you caught it with a whisper, it would carry your wish all the way to Dreamland.

Tonight, {{name}} leaned close to the window and whispered very quietly: "I wish for the most peaceful sleep."

The cloud paused. It glowed softly pink.

Then it wrapped around {{name}}'s room like a warm blanket, filling every corner with quiet and calm.

{{name}} felt very, very heavy — in the best possible way.

The Wish Cloud stayed all night, keeping guard.

Nothing could disturb that sleep. Not even a single sound. 🌙`,
        readingNote: "",
      },
      {
        title: "The Moonkeeper's Gift",
        body: `Every evening, the Moonkeeper climbs a long silver ladder to hang the moon in the sky.

One night, {{name}} watched from the window.

The Moonkeeper noticed {{name}} watching and floated gently down.

"You look tired," the Moonkeeper said kindly.

"I am," said {{name}}.

"Here." The Moonkeeper placed something soft and glowing in {{name}}'s hands — a tiny piece of moonlight.

"Hold it while you sleep. It will keep you safe all night."

{{name}} lay down, still holding the moonlight gently.

It was warm. And soft. And it smelled like nighttime.

And {{name}} slept the very best sleep of all. 🌙`,
        readingNote: "",
      },
    ],
    Calm: [
      {
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
        readingNote: "",
      },
      {
        title: "The Dream Garden",
        body: `Behind a hidden gate at the edge of the world, there is a garden that only appears at night.

{{name}} found the gate one evening, just before sleep.

It opened without a sound.

Inside: flowers that glow in the dark. A path made of soft moss. Trees that hum very quietly.

{{name}} walked slowly down the path. There was nowhere to hurry to.

At the center of the garden was a hammock made of woven moonlight.

{{name}} lay in it. It swayed gently — just enough.

The glowing flowers closed for the night, one by one.

And {{name}} closed too. 🌙`,
        readingNote: "",
      },
    ],
  },

  Adventure: {
    Wired: [
      {
        title: "The Explorer Who Found Home",
        body: `Explorer {{name}} had sailed seven seas, crossed three deserts, and climbed the tallest mountain in the world.

But by evening, the boat was moored. The tent was pitched. The fire had burned down to soft red coals.

"Where to next?" {{name}}'s companion asked.

"Home," said {{name}} quietly.

Because after every adventure — no matter how grand — there is nothing better than a warm bed, a familiar ceiling, and the sound of gentle breathing.

{{name}} climbed into the sleeping bag. The stars appeared one by one above the tent.

The whole world went still.

And the bravest explorer fell into the deepest, most deserved sleep. 🌙`,
        readingNote: "",
      },
      {
        title: "Captain {{name}} and the Still Sea",
        body: `Captain {{name}} had sailed through three storms today. Defeated a kraken. Found an island no one had ever found before.

But now the sea was completely still.

The ship rocked gently: forward and back. Forward and back.

The crew had already fallen asleep. Even the parrot was quiet.

Captain {{name}} looked out at the water. It was dark and flat and peaceful and enormous.

There was nothing to fight. Nothing to find.

Just the soft rocking of the ship and the sound of the ocean breathing.

Captain {{name}}'s eyes went heavy.

The sea kept rocking. The stars kept watch.

And the bravest captain on any ocean drifted off to sleep. 🌙`,
        readingNote: "",
      },
    ],
    Tired: [
      {
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
        readingNote: "",
      },
      {
        title: "The Long Way Home",
        body: `{{name}} had walked a very long way today — through the meadow and over the bridge and all the way to the edge of the known world.

Now it was time to walk back.

One step. Then another.

The path home was quieter than the path out. The birds had gone to sleep. The flowers had folded up.

{{name}}'s feet knew the way without looking.

Step by step. Slower and slower.

The lights of home came into view, warm and golden.

{{name}} was inside. Was warm. Was somewhere safe.

Was asleep. 🌙`,
        readingNote: "",
      },
    ],
    Calm: [
      {
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
        readingNote: "",
      },
      {
        title: "The Last Mountain",
        body: `{{name}} had climbed every mountain there was to climb.

But the Last Mountain was different. It was very small. And very quiet. And at the top was just a soft patch of grass and a view of everything.

{{name}} sat down.

There was nothing left to conquer.

The wind moved slowly through the grass. A hawk circled below, lazy and calm.

The sky turned from blue to gold to the softest purple.

{{name}} lay back on the grass and looked up.

The stars came out one by one, as if they'd been waiting.

And on the Last Mountain, in the softest grass, {{name}} found the best rest of all. 🌙`,
        readingNote: "",
      },
    ],
  },

  Friendship: {
    Wired: [
      {
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
        readingNote: "",
      },
      {
        title: "The Sleepover That Ended Just Right",
        body: `{{name}} and the best friend in the whole world had stayed up very, very, very late.

They'd told every joke they knew. Built a pillow fort. Named all the stuffed animals.

Now the fort was quiet. The jokes were done. The stuffed animals had their names.

{{name}} lay still in the soft dark and listened.

The breathing of a best friend. The creak of the house. The sound of outside — distant, safe, far away.

Everything was exactly right.

Eyes closed.

The very best day ended in the very best way.

Asleep, together. 🌙`,
        readingNote: "",
      },
    ],
    Tired: [
      {
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
        readingNote: "",
      },
      {
        title: "The Kindness That Stayed",
        body: `Today, {{name}} did something kind.

Maybe it was sharing. Maybe it was helping. Maybe it was just sitting with someone who needed company.

Whatever it was, it mattered.

And now, at the end of the day, the kind thing was still there — glowing warm in the chest, like a small candle.

Good things don't disappear. They stay.

{{name}} pulled the blanket close and felt the glow.

Outside, the stars were doing what stars do. Being steady and bright and dependable.

Just like {{name}}.

Sleep came gently. Like it always does after a day well-lived. 🌙`,
        readingNote: "",
      },
    ],
    Calm: [
      {
        title: "Penelope the Firefly",
        body: `Little Penelope the firefly had one very important job each night: she flew from window to window, checking on all the sleeping children.

When she came to {{name}}'s window, she hovered softly.

{{name}} was nestled in, breathing slowly. Already at peace.

Penelope blinked once — which in firefly means "you are safe."
She blinked again — which means "you are loved."
And once more — which means "sleep well."

Then she flew on into the dark, carrying light wherever she went.

And {{name}} slept all night, wrapped in the quiet glow of those three small blinks. 🌙`,
        readingNote: "",
      },
      {
        title: "The Letter Under the Pillow",
        body: `Every night, {{name}}'s best friend left a letter under the pillow.

Not a real letter — just a feeling.

The feeling said: today was good because of you. The world is better because you're in it. Sleep well.

{{name}} didn't know how the feeling got there. It was just always there, at the end of every day, right before sleep.

The pillow was soft. The blanket was warm.

And the feeling was there.

It was enough to make everything quiet inside.

{{name}} slept. And the feeling stayed, all through the night. 🌙`,
        readingNote: "",
      },
    ],
  },

  Nature: {
    Wired: [
      {
        title: "The River That Never Hurries",
        body: `{{name}} sat by the river at the end of the long, full day.

The river was never in a hurry. It moved at exactly the right speed — slow enough to reflect the sky, fast enough to keep going.

"Where are you going?" {{name}} asked.

"To the sea," the river said. "But not tonight. Tonight I rest."

{{name}} watched the water grow darker and quieter as the sun dipped low.

A frog said goodnight. A heron stood still like a dream.

{{name}} felt something settle — deep in the chest — like the river itself was moving through them, carrying the day away.

Slowly... slowly... toward the sea. Toward sleep. 🌙`,
        readingNote: "",
      },
      {
        title: "The Meadow After the Wind",
        body: `All day the wind had blown through the meadow where {{name}} played.

It pushed the grass flat. It lifted kites. It blew hair into eyes and made everything wild and alive.

But now the wind had stopped.

The meadow was completely still.

Every blade of grass stood straight up, almost surprised.

{{name}} lay down in the middle of it all and looked up.

The sky was getting darker and more beautiful by the moment.

The stillness after the wind was the most peaceful thing {{name}} had ever felt.

And in that stillness, sleep arrived — quietly, the way it always does. 🌙`,
        readingNote: "",
      },
    ],
    Tired: [
      {
        title: "Rain on Leaves",
        body: `When {{name}} closed both eyes, the sound of rain arrived.

It came from nowhere and everywhere — soft, steady rain falling on big green leaves.

Tap... tap... tap.

Each drop said something different: rest... rest... rest.

The smell of wet earth drifted through the dark. Cool and clean.

{{name}}'s breathing matched the rain — slow in, slow out.

The whole world outside was drinking and settling and resting.

And {{name}} rested too — held by the sound of a thousand tiny drops, each one a small lullaby. 🌙`,
        readingNote: "",
      },
      {
        title: "The Last Flower of Evening",
        body: `At the end of every evening, the flowers in the garden close.

First the daisies. Then the roses. Then the small blue ones whose name {{name}} always forgot.

One by one, petal by petal, they fold themselves up.

"Time to rest," they seem to say.

{{name}} watched them from the window.

Then {{name}}'s eyes did the same — slowly, one blink at a time.

The garden was almost dark now. The last flower closed.

And {{name}} followed — into the warm, soft dark of a good night's sleep. 🌙`,
        readingNote: "",
      },
    ],
    Calm: [
      {
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
        readingNote: "",
      },
      {
        title: "The Night the Stars Came Down",
        body: `One night, the stars came very close to the earth. Close enough that {{name}} could almost touch them.

They were warm. Which {{name}} hadn't expected.

"We've been watching you," one star said — very quietly, the way stars talk.

"You worked hard today. You felt big feelings. You kept going."

"Now rest. We'll keep the light on."

{{name}} lay very still and looked up at all that warm light.

The stars didn't move. They never do.

And {{name}} didn't either.

Until morning. 🌙`,
        readingNote: "",
      },
    ],
  },
};

export const STORY_THEMES = Object.keys(storyTemplates);
export const STORY_ENERGIES = ["Wired", "Tired", "Calm"] as const;

export function getStory(theme: string, energy: string, childName: string, ageRange?: AgeRange): StoryResult {
  const themeData = storyTemplates[theme] ?? storyTemplates["Animals"];
  const energyData = themeData[energy] ?? themeData["Calm"];
  const template = energyData[Math.floor(Math.random() * energyData.length)];
  const name = childName || "Little One";
  return {
    title: template.title.replace(/\{\{name\}\}/g, name),
    body: template.body.replace(/\{\{name\}\}/g, name),
    readingNote: ageReadingNote(ageRange),
  };
}

// ─────────────────────────────────────────────
// ROUTINES
// ─────────────────────────────────────────────

export const ROUTINES: Routine[] = [
  {
    name: "Morning Chaos",
    icon: "sun",
    steps: [
      { action: "Wake with connection", script: '"Good morning, sunshine. I\'m so glad to see you today."' },
      { action: "Offer two choices for getting up", script: '"Do you want to hop out of bed or do a big stretch first?"' },
      { action: "Bathroom first, together", script: '"Let\'s go brush those teeth — I\'ll race you!"' },
      { action: "Clothes on — their choice", script: '"You pick — the blue shirt or the stripe one? You\'re the boss of your outfit."' },
      { action: "Breakfast — simple and consistent", script: '"Your favorite seat is waiting. Come eat so your body has energy."' },
      { action: "Pack bag the night before (remind)", script: '"We packed everything last night — your bag is ready by the door."' },
      { action: "Out the door with warmth", script: '"You\'re going to have a wonderful day. I love you so much."' },
    ],
  },
  {
    name: "Bedtime",
    icon: "moon",
    steps: [
      { action: "Give a 10-minute warning", script: '"Ten more minutes, then we start getting ready for bed."' },
      { action: "Bath or wash up", script: '"Time to wash the day off. You can pick one bath toy tonight."' },
      { action: "Pajamas and brush teeth", script: '"PJs on, teeth brushed — you\'re doing such a good job."' },
      { action: "One story or quiet reading", script: '"Climb in — let\'s read our story together."' },
      { action: "Lights dimmed, connection check-in", script: '"What was one good thing about today? I\'ll share mine too."' },
      { action: "Final tuck-in", script: '"I love you. You are safe. Sleep will come. I\'m right here."' },
      { action: "Leave with consistency", script: '"Goodnight. See you in the morning." — same words every time.' },
    ],
  },
  {
    name: "Hangry Time",
    icon: "zap",
    steps: [
      { action: "Acknowledge first, solve second", script: '"I can see you\'re really hungry. Let\'s fix that right now."' },
      { action: "Offer food immediately — no negotiating", script: '"Here\'s a snack to start while I make the rest."' },
      { action: "Keep it simple", script: '"Cheese and crackers? Coming right up. No waiting."' },
      { action: "Lower all demands while hungry", script: "No homework, no screens, no big conversations. Eating comes first." },
      { action: "Sit together while they eat", script: '"Tell me about your day — or just eat. Both are totally fine."' },
      { action: "Check in after eating", script: '"Feeling better? Good. Your body needed that."' },
    ],
  },
];

// ─────────────────────────────────────────────
// TAKE A BREATH
// ─────────────────────────────────────────────

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
    childActivity: "Blow imaginary birthday candles together — breathe in big, blow out slow. Count 5 candles.",
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
  {
    validation: "Your child doesn't need a perfect parent. They need you — real, present, and trying.",
    groundingAction: "Splash cold water on your face. It resets the vagus nerve and calms the stress response.",
    childActivity: "Count 10 slow claps together — steady rhythm is naturally regulating.",
  },
  {
    validation: "You've gotten through 100% of your hard days so far. This one is no different.",
    groundingAction: "Put one hand on your belly. Breathe into your hand. Feel it rise. Repeat 3 times.",
    childActivity: "Starfish breathing — trace the outline of a hand slowly, breathing in on each finger up, out on the way down.",
  },
];

export function getBreathResult(): BreathResult {
  return breathResults[Math.floor(Math.random() * breathResults.length)];
}
