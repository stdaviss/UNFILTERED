#!/usr/bin/env python3
"""Generate js/data/cards.js from the Office Unfiltered master deck."""
from pathlib import Path

# character rotation by type so art stays varied and swappable
TRUTH_CHARS = ["nova", "logic", "echo", "atlas", "zen"]
DARE_CHARS = ["pulse", "spark", "bold", "rise", "link"]
SCENARIO_CHARS = ["logic", "atlas", "echo", "link", "bold"]
ARCHETYPE_CHARS = ["rise", "atlas", "spark", "echo", "zen", "logic", "link", "bold", "nova", "pulse"]
SAFETY_CHARS = ["safety"]

TRUTHS = [
    ("Office Culture & Norms", "light", [
        "What's one office habit that exists in almost every company, no matter the industry?",
        "What's something companies say they value, but rarely practice?",
        "What's an unwritten rule that everyone seems to understand?",
        "What's a behavior that's technically \"allowed\" but silently judged?",
        "What's something that feels mandatory even though it isn't written anywhere?",
        "What's a tradition or ritual that people follow without knowing why?",
        "What's something people complain about privately but accept publicly?",
        "What's a rule that sounds good on paper but feels unrealistic in real life?",
        "What's something that makes a workplace feel \"corporate\" instantly?",
        "What's a sign that tells you a workplace culture is actually healthy?",
    ]),
    ("Communication & Meetings", "light", [
        "What phrase usually means \"I don't agree, but I don't want to argue\"?",
        "What sentence sounds productive but often delays action?",
        "What's the most polite way people say \"this isn't my responsibility\"?",
        "What phrase usually means \"this meeting could have been shorter\"?",
        "What kind of message feels urgent but usually isn't?",
        "What's something people say to sound aligned, even when they're confused?",
        "What's the clearest sign that a meeting has lost its purpose?",
        "What phrase usually means \"we're not ready to decide yet\"?",
        "What's something people say when they want to end a discussion without conflict?",
        "What's the most common reason meetings go longer than planned?",
    ]),
    ("Time, Productivity & Workload", "standard", [
        "What part of the workday feels the longest, no matter how short it is?",
        "What's something that takes more time than people expect?",
        "What's something people rush, even when it shouldn't be rushed?",
        "What's a task that always gets postponed?",
        "What's the biggest distraction that looks like productivity?",
        "What's something people do to look busy, not to be productive?",
        "What's a sign that someone's workload is underestimated?",
        "What's something that saves time but isn't used enough?",
        "What's a moment in the day when focus is hardest to keep?",
        "What's something that feels urgent but usually isn't important?",
    ]),
    ("Energy, Motivation & Emotions", "standard", [
        "What usually gives people an energy boost during the workday?",
        "What usually drains energy the fastest?",
        "What makes a day feel \"lighter\" even if the workload is heavy?",
        "What makes a day feel heavier than it should?",
        "What's a small win that changes the mood of a whole team?",
        "What's something that quietly motivates people more than rewards?",
        "What's a sign that a team is mentally tired?",
        "What's something that helps people reset after a stressful moment?",
        "What makes people feel appreciated without being praised publicly?",
        "What's a simple thing that improves morale more than expected?",
    ]),
    ("Identity, Meaning & Growth", "light", [
        "What makes a job feel meaningful beyond the salary?",
        "What's a sign that someone is growing, even if their role hasn't changed?",
        "What makes people feel proud of their work?",
        "What's something that makes work feel more \"human\"?",
        "What's a small moment that reminds people why their role matters?",
        "What's a sign that someone feels trusted at work?",
        "What makes a workplace feel like a place of growth, not just performance?",
        "What's something people learn at work that helps them outside of it?",
        "What makes people feel like they belong to a team?",
        "What's one thing that turns a job into a craft?",
    ]),
]

DARES = [
    ("Express & Perform", "standard", [
        "Act out what \"Monday energy\" looks like without using words.",
        "Act out what \"Friday energy\" looks like without using words.",
        "Show your version of a \"professional smile.\"",
        "Show your version of an \"I need coffee\" face.",
        "Act like you just heard unexpectedly good news at work.",
        "Act like you just realized a meeting was canceled.",
        "Show what \"I'm pretending to understand\" looks like.",
        "Show what \"I'm actually excited\" looks like.",
        "Act like you're presenting something extremely boring with total enthusiasm.",
        "Show your most exaggerated \"thinking\" face.",
    ]),
    ("Create & Imagine", "light", [
        "Invent a new job title for yourself that sounds impressive but unclear.",
        "Create a fake company slogan using only three words.",
        "Invent a meeting name that would make people curious to attend.",
        "Create a new emoji that represents \"work life.\"",
        "Imagine a company mascot and describe it in one sentence.",
        "Create a rule that would make work more fun but still realistic.",
        "Invent a holiday that teams would secretly love.",
        "Create a name for a coffee that sounds like a luxury product.",
        "Imagine a button on your desk that fixes one work problem. What does it do?",
        "Create a one-sentence mission statement for \"having a good day at work.\"",
    ]),
    ("Communicate Differently", "standard", [
        "Say \"I agree\" using three completely different tones.",
        "Explain what you do at work without using any work-related words.",
        "Say \"Let's move on\" in the most polite way possible.",
        "Describe a meeting using only one-word sentences.",
        "Explain a simple task as if it were extremely complicated.",
        "Say \"No\" in the nicest way you can, without using the word \"no.\"",
        "Explain \"teamwork\" as if you were explaining it to an alien.",
        "Describe your mood using only weather terms.",
        "Turn a boring sentence into something that sounds exciting.",
        "Say \"I need help\" as if you were announcing great news.",
    ]),
    ("Group Energy Builders", "high", [
        "Everyone nods in rhythm together for five seconds.",
        "One person starts a slow clap, the group joins, then stops together.",
        "Everyone shows a thumbs-up, thumbs-down, or neutral at the same time.",
        "Create a silent \"wave\" using only your hands around the group.",
        "Everyone takes a deep breath together and exhales at the same time.",
        "Count from 1 to 5 as a group, but only one person can speak at a time. If two speak, restart.",
        "Everyone shows their \"ready to focus\" face at the same time.",
        "Choose a simple word, like \"go\" or \"now,\" and say it together once.",
        "Everyone points gently toward the center at the same time, then relax.",
        "Create a three-second moment of complete silence together.",
    ]),
    ("Confidence & Presence", "light", [
        "Sit or stand a little taller and take one confident breath.",
        "Look around the group and give one slow, calm nod.",
        "Say your name with a confident tone, as if being introduced on stage.",
        "Hold eye contact with the group for three seconds and smile.",
        "Say \"I'm ready\" in a calm, confident voice.",
        "Show what \"quiet confidence\" looks like using only posture.",
        "Give yourself a silent, respectful round of applause.",
        "Say one word that represents strength to you.",
        "Show a gesture that means \"I've got this.\"",
        "Take one deep breath and release it slowly.",
    ]),
]

SCENARIOS = [
    "A meeting ends with \"great discussion\" but no decisions. What usually happens next?",
    "A deadline was agreed on, but everyone interpreted it differently. What would you do?",
    "A project has three owners and none of them feel fully responsible. What happens next?",
    "A new tool is introduced that nobody asked for. What would the team do?",
    "A calendar invite arrives with no agenda and a long guest list. What usually happens?",
    "A task keeps getting postponed because it's \"not urgent yet.\" What would you do?",
    "Someone says \"let's take this offline,\" and the topic disappears forever. What happens next?",
    "A change is announced, but no one explains why. What would the team do?",
    "A meeting runs overtime because \"we're almost done.\" What usually happens?",
    "A report is finished, but nobody is sure who should read it. What would you do?",
    "Feedback is requested, but no one knows how honest to be. What would the team do?",
    "A decision is made, then quietly revisited later. What happens next?",
    "A process exists that everyone follows but no one understands. What would you do?",
    "A task feels simple, but approval takes weeks. What usually happens?",
    "A conversation happens in private that should have happened publicly. What would the team do?",
    "A role changes, but the responsibilities don't. What happens next?",
    "A meeting is scheduled to prepare for another meeting. What would you do?",
    "A success happens, but it feels rushed past. What would the team do?",
    "A mistake happens, and everyone focuses on fixing instead of learning. What happens next?",
    "A rule exists that slows things down, but no one questions it. What would you do?",
    "A project starts with excitement and slowly loses momentum. What usually happens?",
    "Everyone agrees in the meeting, but nothing changes afterward. What would the team do?",
    "A message is written very carefully to avoid misunderstandings. What happens next?",
    "A decision is delayed because not everyone is present. What would you do?",
    "A task is labeled \"quick,\" but becomes complex. What would the team do?",
]

ARCHETYPES = [
    ("The Optimist", "Always sees potential and opportunity, even in chaos."),
    ("The Realist", "Focuses on what is practical, possible, and grounded."),
    ("The Big-Picture Thinker", "Looks beyond details to long-term impact."),
    ("The Detail Guardian", "Notices small things others overlook."),
    ("The Calm Presence", "Keeps things steady when tension rises."),
    ("The Question Asker", "Always wants clarity and deeper understanding."),
    ("The Creative Spark", "Brings fresh ideas and unconventional thinking."),
    ("The Connector", "Focuses on people, collaboration, and relationships."),
    ("The Problem Solver", "Moves quickly toward solutions."),
    ("The Reflector", "Thinks before speaking and observes dynamics."),
    ("The Challenger", "Gently questions assumptions and habits."),
    ("The Supporter", "Encourages others and builds confidence."),
    ("The Time Keeper", "Cares about efficiency and deadlines."),
    ("The Explorer", "Open to trying new approaches and change."),
    ("The Simplifier", "Turns complex ideas into clear ones."),
    ("The Listener", "Makes others feel heard and understood."),
    ("The Strategist", "Thinks in steps, plans, and outcomes."),
    ("The Harmonizer", "Seeks balance and reduces conflict."),
    ("The Learner", "Approaches everything with curiosity."),
    ("The Encourager", "Lifts energy and motivation in the group."),
]

SAFETY = [
    ("Skip, No Explanation Needed", "You may skip this card or any future card without giving a reason."),
    ("Answer Hypothetically", "You may answer as \"someone,\" \"a team,\" or \"in general,\" not as yourself."),
    ("Replace the Card", "Discard this card and draw a new one immediately."),
    ("Group Response Only", "Everyone answers together. No individual spotlight."),
    ("Pause the Game", "The facilitator pauses for a short break or reset."),
    ("Change the Energy Level", "Switch to Light Mode (Truth + Scenario only) for the next 5 turns."),
    ("Humor Mode", "For the next round, answers must stay playful and non-serious."),
    ("Silent Round", "For the next card, responses are shown with gestures or one word only."),
    ("Facilitator's Choice", "The facilitator decides how the next card is handled: skip, group answer, or replace."),
    ("End with Appreciation", "The game can be closed immediately with one optional round of appreciation or gratitude."),
]

SAFETY_ACTIONS = [
    "skip", "reframe", "replace", "group", "pause", "lower-energy", "humor", "silent", "host-choice", "end"
]


def js_str(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def card(cid, typ, text, character, difficulty, extra=None):
    rec = {
        "id": cid,
        "type": typ,
        "text": text,
        "character": character,
        "difficulty": difficulty,
        "art": f"assets/characters/{character}.svg",
    }
    if extra:
        rec.update(extra)
    return rec


def emit_obj(obj, indent=2):
    sp = " " * indent
    lines = ["{"]
    items = list(obj.items())
    for i, (k, v) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        if isinstance(v, str):
            lines.append(f'{sp}  {k}: "{js_str(v)}"{comma}')
        elif isinstance(v, bool):
            lines.append(f'{sp}  {k}: {"true" if v else "false"}{comma}')
        else:
            lines.append(f'{sp}  {k}: {v}{comma}')
    lines.append(f"{sp}}}")
    return "\n".join(lines)


def main():
    cards = []
    n = 0
    for cat, diff, texts in TRUTHS:
        for text in texts:
            n += 1
            cards.append(card(
                f"truth-{n:03d}", "truth", text, TRUTH_CHARS[(n - 1) % len(TRUTH_CHARS)], diff,
                {"theme": cat, "group": False},
            ))

    n = 0
    for cat, diff, texts in DARES:
        for text in texts:
            n += 1
            group = cat == "Group Energy Builders"
            cards.append(card(
                f"dare-{n:03d}", "dare", text, DARE_CHARS[(n - 1) % len(DARE_CHARS)], diff,
                {"theme": cat, "group": group},
            ))

    for i, text in enumerate(SCENARIOS, 1):
        cards.append(card(
            f"scenario-{i:03d}", "scenario", text, SCENARIO_CHARS[(i - 1) % len(SCENARIO_CHARS)], "standard",
            {"theme": "Workplace Situations", "group": True},
        ))

    for i, (name, desc) in enumerate(ARCHETYPES, 1):
        cards.append(card(
            f"archetype-{i:03d}", "archetype", f"{name}. {desc} Use this perspective for the next response.",
            ARCHETYPE_CHARS[(i - 1) % len(ARCHETYPE_CHARS)], "standard",
            {"theme": "Archetypes", "title": name, "group": False},
        ))

    for i, (name, desc) in enumerate(SAFETY, 1):
        cards.append(card(
            f"safety-{i:03d}", "safety", desc, "safety", "light",
            {"theme": "Safety", "title": name, "safetyAction": SAFETY_ACTIONS[i - 1], "group": False},
        ))

    # Special featured card from the UI spec
    cards[0]["text"] = "If this office was a movie genre (Comedy, Thriller, Sci-Fi), which one would it be today?"
    cards[0]["character"] = "nova"
    cards[0]["art"] = "assets/characters/nova.svg"
    cards[0]["featured"] = True

    out = Path("js/data/cards.js")
    chunks = ["/** Auto-generated Office Unfiltered deck. Swap art via the `art` field or character SVG files. */", "export const CARDS = ["]
    for i, c in enumerate(cards):
        comma = "," if i < len(cards) - 1 else ""
        chunks.append(emit_obj(c) + comma)
    chunks.append("];")
    chunks.append("")
    chunks.append("export const CARDS_BY_ID = Object.fromEntries(CARDS.map((card) => [card.id, card]));")
    chunks.append("")
    chunks.append("export const CARDS_BY_TYPE = CARDS.reduce((acc, card) => {")
    chunks.append("  (acc[card.type] ||= []).push(card);")
    chunks.append("  return acc;")
    chunks.append("}, {});")
    chunks.append("")
    out.write_text("\n".join(chunks) + "\n")
    print(f"Wrote {len(cards)} cards to {out}")


if __name__ == "__main__":
    main()
