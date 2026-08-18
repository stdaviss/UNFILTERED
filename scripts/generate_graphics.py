#!/usr/bin/env python3
"""Generate swappable SVG art for Office Unfiltered."""
from pathlib import Path

ROOT = Path(".")


def write(path, svg):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(svg.strip() + "\n")
    print("wrote", path)


def face(cx, cy, skin, hair_fn, extras=""):
    return f"""
  <g>
    {hair_fn(cx, cy)}
    <ellipse cx="{cx}" cy="{cy}" rx="62" ry="72" fill="{skin}"/>
    <ellipse cx="{cx-22}" cy="{cy-4}" rx="7" ry="9" fill="#2A241C"/>
    <ellipse cx="{cx+22}" cy="{cy-4}" rx="7" ry="9" fill="#2A241C"/>
    <ellipse cx="{cx-19}" cy="{cy-7}" rx="2.4" ry="2.6" fill="#fff"/>
    <ellipse cx="{cx+25}" cy="{cy-7}" rx="2.4" ry="2.6" fill="#fff"/>
    <path d="M{cx-18} {cy+28} Q{cx} {cy+40} {cx+18} {cy+28}" fill="none" stroke="#C46A58" stroke-width="3.5" stroke-linecap="round"/>
    {extras}
  </g>"""


# ---------- characters ----------

def nova():
    # Blonde woman in yellow, thinking — featured Truth card
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Nova — The Optimist</title>
  <g opacity=".95">
    <ellipse cx="292" cy="78" rx="48" ry="42" fill="#fff" stroke="#1E4F86" stroke-width="5"/>
    <text x="292" y="90" text-anchor="middle" font-size="42" font-family="Arial Black, sans-serif" fill="#1E4F86">?</text>
    <ellipse cx="338" cy="148" rx="28" ry="26" fill="#fff" stroke="#1E4F86" stroke-width="4"/>
    <path d="M330 140 l8 0 3-8 3 8 8 0-6 5 2 8-7-4-7 4 2-8z" fill="#F5B83D"/>
    <ellipse cx="358" cy="198" rx="20" ry="18" fill="#fff" stroke="#1E4F86" stroke-width="3.5"/>
    <path d="M351 198 h14 M358 191 v14" stroke="#2F9E75" stroke-width="3.2" stroke-linecap="round"/>
    <ellipse cx="368" cy="240" rx="14" ry="12" fill="#fff" stroke="#1E4F86" stroke-width="3"/>
    <rect x="361" y="234" width="14" height="12" rx="2" fill="#3BAAF0"/>
  </g>
  <ellipse cx="200" cy="430" rx="92" ry="18" fill="#000" opacity=".18"/>
  <path d="M132 430 C132 300 140 250 200 248 C260 250 268 300 268 430 Z" fill="#F5D76E"/>
  <path d="M152 318 h96 v18 c0 22-20 34-48 34s-48-12-48-34z" fill="#E8C04A"/>
  <circle cx="200" cy="196" r="78" fill="#F7C9A8"/>
  <path d="M132 188 C128 108 168 86 200 88 C248 90 278 122 270 188 C262 148 240 128 200 126 C162 128 140 150 132 188 Z" fill="#F4D06A"/>
  <path d="M124 200 C118 150 150 118 178 122 C160 148 148 176 150 214 C140 210 128 208 124 200Z" fill="#E8C04A"/>
  <path d="M276 200 C282 150 250 118 222 122 C240 148 252 176 250 214 C260 210 272 208 276 200Z" fill="#E8C04A"/>
  <ellipse cx="176" cy="196" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="224" cy="196" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="179" cy="193" rx="2.6" ry="2.8" fill="#fff"/>
  <ellipse cx="227" cy="193" rx="2.6" ry="2.8" fill="#fff"/>
  <path d="M188 228 Q200 238 214 228" fill="none" stroke="#C46A58" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M164 176 Q176 168 186 176" fill="none" stroke="#2A241C" stroke-width="3" stroke-linecap="round"/>
  <path d="M214 176 Q224 168 236 176" fill="none" stroke="#2A241C" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="168" cy="214" rx="12" ry="7" fill="#F0A090" opacity=".45"/>
  <ellipse cx="232" cy="214" rx="12" ry="7" fill="#F0A090" opacity=".45"/>
  <path d="M248 250 C278 268 292 310 286 352" fill="none" stroke="#F7C9A8" stroke-width="18" stroke-linecap="round"/>
  <circle cx="292" cy="358" r="16" fill="#F7C9A8"/>
  <path d="M278 348 Q292 332 304 348" fill="none" stroke="#C46A58" stroke-width="2.4"/>
</svg>'''


def pulse():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Pulse — The Energizer</title>
  <path d="M70 90 l18 42 40-10-30 48 48-6-78 96 12-58-40 8 22-80-32-8z" fill="#F5B83D"/>
  <path d="M330 70 l-10 46 38 8-48 42 36 10-86 78 28-54-34 2 40-86-28-6z" fill="#FFE08A"/>
  <ellipse cx="200" cy="438" rx="100" ry="16" fill="#000" opacity=".18"/>
  <path d="M118 438 C118 292 128 248 200 246 C272 248 282 292 282 438 Z" fill="#FF7A45"/>
  <path d="M148 320 h104 v16 c0 24-22 38-52 38s-52-14-52-38z" fill="#E45E32"/>
  <circle cx="200" cy="198" r="80" fill="#C68642"/>
  <path d="M122 200 C118 112 164 78 200 80 C250 82 292 118 280 202 C300 140 250 70 200 72 C148 74 108 122 122 200Z" fill="#2C1810"/>
  <path d="M250 96 C278 108 296 150 286 200" fill="none" stroke="#2C1810" stroke-width="22" stroke-linecap="round"/>
  <ellipse cx="176" cy="198" rx="8" ry="10" fill="#1A120C"/>
  <ellipse cx="226" cy="198" rx="8" ry="10" fill="#1A120C"/>
  <ellipse cx="179" cy="195" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="229" cy="195" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M176 228 Q200 252 226 228" fill="none" stroke="#8A3A2A" stroke-width="4" stroke-linecap="round"/>
  <circle cx="168" cy="216" r="8" fill="#E0896A" opacity=".5"/>
  <circle cx="234" cy="216" r="8" fill="#E0896A" opacity=".5"/>
  <path d="M96 300 C70 240 110 200 148 230" fill="none" stroke="#C68642" stroke-width="18" stroke-linecap="round"/>
  <path d="M304 300 C330 240 290 200 252 230" fill="none" stroke="#C68642" stroke-width="18" stroke-linecap="round"/>
</svg>'''


def logic():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Logic — The Analyzer</title>
  <ellipse cx="318" cy="110" rx="58" ry="46" fill="#fff" stroke="#5B3A2E" stroke-width="4"/>
  <path d="M300 110 Q318 92 336 110 Q318 128 300 110Z" fill="#E8D5C8"/>
  <ellipse cx="200" cy="438" rx="96" ry="16" fill="#000" opacity=".18"/>
  <path d="M126 438 C126 300 138 256 200 254 C262 256 274 300 274 438 Z" fill="#3B6FA0"/>
  <path d="M154 328 h92 v14 c0 20-20 32-46 32s-46-12-46-32z" fill="#2E5A86"/>
  <circle cx="200" cy="196" r="76" fill="#E8B896"/>
  <path d="M128 186 C130 112 162 92 200 90 C244 92 274 118 272 186 C268 150 240 128 200 126 C162 128 136 150 128 186Z" fill="#4A3728"/>
  <rect x="148" y="176" width="104" height="8" rx="3" fill="#2A241C"/>
  <circle cx="172" cy="196" r="22" fill="none" stroke="#2A241C" stroke-width="5"/>
  <circle cx="228" cy="196" r="22" fill="none" stroke="#2A241C" stroke-width="5"/>
  <path d="M194 196 h12" stroke="#2A241C" stroke-width="4"/>
  <ellipse cx="172" cy="196" rx="7" ry="9" fill="#2A241C"/>
  <ellipse cx="228" cy="196" rx="7" ry="9" fill="#2A241C"/>
  <ellipse cx="175" cy="193" rx="2.2" ry="2.4" fill="#fff"/>
  <ellipse cx="231" cy="193" rx="2.2" ry="2.4" fill="#fff"/>
  <path d="M186 228 Q200 232 216 228" fill="none" stroke="#C46A58" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M150 250 C158 278 176 292 200 294 C224 292 242 278 250 250 C240 268 222 276 200 276 C178 276 160 268 150 250Z" fill="#6B4A36"/>
  <path d="M118 300 C90 250 120 210 150 236" fill="none" stroke="#E8B896" stroke-width="16" stroke-linecap="round"/>
  <circle cx="112" cy="248" r="14" fill="#E8B896"/>
</svg>'''


def rise():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Rise — The Encourager</title>
  <path d="M140 92 l20-40 20 28 20-48 20 48 20-28 20 40-60 18z" fill="#F5B83D" stroke="#C79212" stroke-width="3"/>
  <circle cx="160" cy="70" r="6" fill="#fff"/>
  <circle cx="200" cy="48" r="7" fill="#fff"/>
  <circle cx="240" cy="70" r="6" fill="#fff"/>
  <ellipse cx="200" cy="438" rx="96" ry="16" fill="#000" opacity=".18"/>
  <path d="M124 438 C124 298 136 252 200 250 C264 252 276 298 276 438 Z" fill="#7B5EA7"/>
  <path d="M152 326 h96 v14 c0 22-20 34-48 34s-48-12-48-34z" fill="#634A8C"/>
  <circle cx="200" cy="196" r="76" fill="#D4A574"/>
  <path d="M128 200 C122 118 160 96 200 94 C248 96 280 126 272 200 C264 150 236 128 200 126 C164 128 138 152 128 200Z" fill="#1A1A1A"/>
  <path d="M118 210 C112 170 132 140 156 138 C140 168 132 196 136 228Z" fill="#111"/>
  <path d="M282 210 C288 170 268 140 244 138 C260 168 268 196 264 228Z" fill="#111"/>
  <ellipse cx="176" cy="196" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="224" cy="196" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="179" cy="193" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="227" cy="193" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M178 228 Q200 246 224 228" fill="none" stroke="#B45A4A" stroke-width="3.6" stroke-linecap="round"/>
  <circle cx="168" cy="214" r="8" fill="#E09A80" opacity=".45"/>
  <circle cx="232" cy="214" r="8" fill="#E09A80" opacity=".45"/>
  <path d="M96 310 C72 250 118 214 150 240" fill="none" stroke="#D4A574" stroke-width="16" stroke-linecap="round"/>
  <path d="M304 310 C328 250 282 214 250 240" fill="none" stroke="#D4A574" stroke-width="16" stroke-linecap="round"/>
</svg>'''


def atlas():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Atlas — The Strategist</title>
  <g opacity=".9">
    <ellipse cx="86" cy="92" rx="36" ry="32" fill="#fff" stroke="#1E4F86" stroke-width="4"/>
    <text x="86" y="104" text-anchor="middle" font-size="32" font-family="Arial Black, sans-serif" fill="#1E4F86">?</text>
    <ellipse cx="50" cy="150" rx="24" ry="22" fill="#fff" stroke="#1E4F86" stroke-width="3.5"/>
    <path d="M44 144 l6 0 2-6 2 6 6 0-5 4 2 6-5-3-5 3 2-6z" fill="#F5B83D"/>
    <ellipse cx="40" cy="198" rx="18" ry="16" fill="#fff" stroke="#1E4F86" stroke-width="3"/>
    <path d="M34 198 h12 M40 192 v12" stroke="#2F9E75" stroke-width="3" stroke-linecap="round"/>
  </g>
  <ellipse cx="200" cy="438" rx="100" ry="16" fill="#000" opacity=".18"/>
  <path d="M120 438 C120 292 132 250 200 248 C268 250 280 292 280 438 Z" fill="#1F3A5F"/>
  <path d="M150 328 h100 v14 c0 20-22 32-50 32s-50-12-50-32z" fill="#17304E"/>
  <circle cx="200" cy="196" r="78" fill="#D2A679"/>
  <path d="M126 188 C130 108 166 86 200 86 C246 88 278 118 274 188 C266 146 238 124 200 122 C164 124 136 148 126 188Z" fill="#2C2118"/>
  <ellipse cx="176" cy="194" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="224" cy="194" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="179" cy="191" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="227" cy="191" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M184 224 Q200 232 218 224" fill="none" stroke="#B45A4A" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M148 248 C156 280 174 298 200 300 C226 298 244 280 252 248 C242 270 224 282 200 282 C176 282 158 270 148 248Z" fill="#3A2A20"/>
</svg>'''


def echo():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Echo — The Listener</title>
  <ellipse cx="200" cy="438" rx="96" ry="16" fill="#000" opacity=".18"/>
  <path d="M126 438 C126 300 136 254 200 252 C264 254 274 300 274 438 Z" fill="#6FAE8A"/>
  <path d="M154 328 h92 v14 c0 20-20 32-46 32s-46-12-46-32z" fill="#588F70"/>
  <circle cx="200" cy="198" r="76" fill="#C68642"/>
  <path d="M122 206 C116 120 158 88 200 88 C250 90 286 128 278 206 C270 150 238 122 200 120 C162 122 132 152 122 206Z" fill="#2A1810"/>
  <path d="M130 168 C142 128 170 118 188 128 C170 148 158 176 160 210Z" fill="#1A100C"/>
  <path d="M270 168 C258 128 230 118 212 128 C230 148 242 176 240 210Z" fill="#1A100C"/>
  <ellipse cx="176" cy="198" rx="8" ry="10" fill="#1A120C"/>
  <ellipse cx="224" cy="198" rx="8" ry="10" fill="#1A120C"/>
  <ellipse cx="179" cy="195" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="227" cy="195" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M180 228 Q200 240 222 228" fill="none" stroke="#8A3A2A" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M108 292 C88 240 126 214 154 236" fill="none" stroke="#C68642" stroke-width="16" stroke-linecap="round"/>
</svg>'''


def spark():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Spark — The Creative</title>
  <circle cx="86" cy="120" r="10" fill="#F5B83D"/>
  <circle cx="320" cy="96" r="8" fill="#9B6BDE"/>
  <circle cx="348" cy="160" r="6" fill="#3BAAF0"/>
  <ellipse cx="200" cy="438" rx="96" ry="16" fill="#000" opacity=".18"/>
  <path d="M124 438 C124 296 136 250 200 248 C264 250 276 296 276 438 Z" fill="#E85A9A"/>
  <path d="M152 326 h96 v14 c0 22-20 34-48 34s-48-12-48-34z" fill="#C44780"/>
  <circle cx="200" cy="196" r="76" fill="#F1C27D"/>
  <path d="M126 200 C118 108 168 78 200 80 C248 82 292 118 276 204" fill="none" stroke="url(#sparkHair)" stroke-width="44" stroke-linecap="round"/>
  <defs>
    <linearGradient id="sparkHair" x1="120" y1="80" x2="280" y2="200">
      <stop stop-color="#F472B6"/><stop offset="1" stop-color="#60A5FA"/>
    </linearGradient>
  </defs>
  <path d="M128 188 C132 108 168 84 200 84 C244 86 276 118 272 188 C262 140 234 118 200 116 C166 118 140 142 128 188Z" fill="#F472B6"/>
  <path d="M240 100 C270 120 286 160 274 198" fill="none" stroke="#60A5FA" stroke-width="28" stroke-linecap="round"/>
  <ellipse cx="176" cy="196" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="224" cy="196" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="179" cy="193" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="227" cy="193" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M178 226 Q200 244 224 226" fill="none" stroke="#C46A58" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M98 300 C76 244 118 210 150 234" fill="none" stroke="#F1C27D" stroke-width="16" stroke-linecap="round"/>
  <path d="M302 300 C324 244 282 210 250 234" fill="none" stroke="#F1C27D" stroke-width="16" stroke-linecap="round"/>
</svg>'''


def zen():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Zen — The Calm Anchor</title>
  <ellipse cx="200" cy="438" rx="96" ry="16" fill="#000" opacity=".18"/>
  <path d="M128 438 C128 302 138 258 200 256 C262 258 272 302 272 438 Z" fill="#39B7A5"/>
  <path d="M156 330 h88 v12 c0 18-18 30-44 30s-44-12-44-30z" fill="#2C9788"/>
  <circle cx="200" cy="198" r="76" fill="#E0AC69"/>
  <path d="M130 200 C128 128 162 104 200 104 C240 104 272 130 270 200 C262 156 236 136 200 136 C164 136 140 156 130 200Z" fill="#C9C4B8"/>
  <ellipse cx="176" cy="198" rx="7" ry="5" fill="#2A241C"/>
  <ellipse cx="224" cy="198" rx="7" ry="5" fill="#2A241C"/>
  <path d="M184 226 Q200 234 218 226" fill="none" stroke="#C46A58" stroke-width="3" stroke-linecap="round"/>
  <path d="M168 176 Q176 170 184 176" fill="none" stroke="#2A241C" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M216 176 Q224 170 232 176" fill="none" stroke="#2A241C" stroke-width="2.6" stroke-linecap="round"/>
</svg>'''


def linkc():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Link — The Connector</title>
  <ellipse cx="200" cy="438" rx="100" ry="16" fill="#000" opacity=".18"/>
  <path d="M118 438 C118 290 130 246 200 244 C270 246 282 290 282 438 Z" fill="#3BAAF0"/>
  <path d="M150 324 h100 v16 c0 22-22 36-50 36s-50-14-50-36z" fill="#2C8FD0"/>
  <circle cx="200" cy="196" r="78" fill="#8D5524"/>
  <path d="M130 188 C136 112 168 90 200 90 C240 92 270 120 270 188 C262 148 236 126 200 124 C166 126 140 148 130 188Z" fill="#1A120C"/>
  <ellipse cx="176" cy="196" rx="8" ry="10" fill="#1A120C"/>
  <ellipse cx="224" cy="196" rx="8" ry="10" fill="#1A120C"/>
  <ellipse cx="179" cy="193" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="227" cy="193" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M178 228 Q200 248 224 228" fill="none" stroke="#6A2E1E" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M90 300 C70 236 118 204 152 230" fill="none" stroke="#8D5524" stroke-width="18" stroke-linecap="round"/>
  <path d="M310 300 C330 236 282 204 248 230" fill="none" stroke="#8D5524" stroke-width="18" stroke-linecap="round"/>
</svg>'''


def bold():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Bold — The Challenger</title>
  <ellipse cx="200" cy="438" rx="96" ry="16" fill="#000" opacity=".18"/>
  <path d="M128 438 C128 300 140 254 200 252 C260 254 272 300 272 438 Z" fill="#1A1A1A"/>
  <path d="M156 328 h88 v12 c0 18-18 28-44 28s-44-10-44-28z" fill="#111"/>
  <rect x="168" y="250" width="64" height="10" fill="#F5F0E6"/>
  <circle cx="200" cy="196" r="76" fill="#FFCD94"/>
  <path d="M132 200 C126 118 164 92 200 92 C244 94 276 126 268 200 C260 148 232 122 200 120 C166 122 140 150 132 200Z" fill="#3B2A20"/>
  <path d="M250 118 C272 140 278 176 268 210" fill="none" stroke="#3B2A20" stroke-width="18" stroke-linecap="round"/>
  <ellipse cx="176" cy="198" rx="8" ry="10" fill="#2A241C"/>
  <ellipse cx="224" cy="190" rx="8" ry="10" fill="#2A241C"/>
  <path d="M214 176 Q228 168 240 178" fill="none" stroke="#2A241C" stroke-width="3.4" stroke-linecap="round"/>
  <ellipse cx="179" cy="195" rx="2.4" ry="2.6" fill="#fff"/>
  <ellipse cx="227" cy="187" rx="2.4" ry="2.6" fill="#fff"/>
  <path d="M186 228 Q200 234 214 226" fill="none" stroke="#C46A58" stroke-width="3.2" stroke-linecap="round"/>
</svg>'''


def safety_stop():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" fill="none">
  <title>Safety — STOP</title>
  <defs>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000" flood-opacity=".35"/>
    </filter>
  </defs>
  <polygon filter="url(#s)" points="200,70 290,106 326,196 290,286 200,322 110,286 74,196 110,106" fill="#C43B2E" stroke="#F4EDE4" stroke-width="14"/>
  <polygon points="200,92 274,122 304,196 274,270 200,300 126,270 96,196 126,122" fill="#E23B2E"/>
  <text x="200" y="214" text-anchor="middle" font-family="Arial Black, Impact, sans-serif" font-size="54" font-weight="800" fill="#fff" letter-spacing="4">STOP</text>
  <text x="200" y="380" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="28" fill="#F4EDE4" letter-spacing="6">SAFETY</text>
</svg>'''


def card_back():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 880" fill="none">
  <title>Office Unfiltered card back</title>
  <rect width="630" height="880" rx="36" fill="#F7F4EE"/>
  <rect x="18" y="18" width="594" height="844" rx="28" fill="#2E7BC4"/>
  <rect x="34" y="34" width="562" height="812" rx="22" fill="#347FCA"/>
  <g opacity=".16" fill="#1E4F86">
    <g font-family="Arial Black, sans-serif" font-size="22">
      <text x="70" y="80">OU</text><text x="190" y="140">OU</text><text x="310" y="80">OU</text>
      <text x="430" y="140">OU</text><text x="550" y="80">OU</text>
      <text x="70" y="220">?</text><text x="200" y="280">✓</text><text x="340" y="220">✎</text>
      <text x="470" y="280">?</text><text x="70" y="360">OU</text><text x="220" y="420">OU</text>
      <text x="360" y="360">OU</text><text x="500" y="420">OU</text>
      <text x="90" y="520">?</text><text x="250" y="580">OU</text><text x="420" y="520">✓</text>
      <text x="80" y="680">OU</text><text x="240" y="740">?</text><text x="400" y="680">OU</text>
      <text x="520" y="740">OU</text>
    </g>
  </g>
  <ellipse cx="315" cy="340" rx="150" ry="18" fill="#1E4F86" opacity=".25"/>
  <g transform="translate(115,70) scale(.9)">
    <path d="M120 438 C120 292 132 250 200 248 C268 250 280 292 280 438 Z" fill="#1F3A5F"/>
    <circle cx="200" cy="196" r="78" fill="#D2A679"/>
    <path d="M126 188 C130 108 166 86 200 86 C246 88 278 118 274 188 C266 146 238 124 200 122 C164 124 136 148 126 188Z" fill="#2C2118"/>
    <ellipse cx="176" cy="194" rx="8" ry="10" fill="#2A241C"/>
    <ellipse cx="224" cy="194" rx="8" ry="10" fill="#2A241C"/>
    <ellipse cx="179" cy="191" rx="2.4" ry="2.6" fill="#fff"/>
    <ellipse cx="227" cy="191" rx="2.4" ry="2.6" fill="#fff"/>
    <path d="M184 224 Q200 232 218 224" fill="none" stroke="#B45A4A" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M148 248 C156 280 174 298 200 300 C226 298 244 280 252 248 C242 270 224 282 200 282 C176 282 158 270 148 248Z" fill="#3A2A20"/>
    <ellipse cx="86" cy="92" rx="36" ry="32" fill="#fff"/>
    <text x="86" y="104" text-anchor="middle" font-size="32" font-family="Arial Black, sans-serif" fill="#1E4F86">?</text>
    <ellipse cx="318" cy="88" rx="28" ry="24" fill="#fff"/>
    <path d="M310 80 l8 0 3-8 3 8 8 0-6 5 2 8-7-4-7 4 2-8z" fill="#F5B83D"/>
  </g>
  <path d="M34 640 C180 600 450 600 596 640 L596 846 C596 858 586 868 574 868 L56 868 C44 868 34 858 34 846 Z" fill="#F5D76E"/>
  <text x="315" y="720" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="36" fill="#111">OFFICE</text>
  <text x="315" y="768" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="34" fill="#1A3A1A">UNFILTERED</text>
</svg>'''


def office_bg():
    # Stylized night office — designed to be blurred behind UI
    windows = []
    for r in range(8):
        for c in range(14):
            on = (r * 7 + c * 3) % 5 != 0
            color = "#F5D76E" if on else "#1A2430"
            opacity = "0.55" if on else "0.25"
            x = 40 + c * 70
            y = 30 + r * 48
            windows.append(f'<rect x="{x}" y="{y}" width="36" height="28" rx="2" fill="{color}" opacity="{opacity}"/>')
    desks = []
    for i in range(5):
        x = 80 + i * 240
        desks.append(f'''
      <rect x="{x}" y="620" width="180" height="12" rx="2" fill="#2A2F2C"/>
      <rect x="{x+20}" y="632" width="8" height="90" fill="#1C211E"/>
      <rect x="{x+150}" y="632" width="8" height="90" fill="#1C211E"/>
      <rect x="{x+40}" y="560" width="100" height="62" rx="4" fill="#151A17"/>
      <rect x="{x+48}" y="568" width="84" height="46" rx="2" fill="#9EE493" opacity=".18"/>
      <rect x="{x+160}" y="590" width="18" height="30" fill="#3B2A20"/>
    ''')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#141820"/>
      <stop offset="1" stop-color="#07090A"/>
    </linearGradient>
  </defs>
  <rect width="1440" height="900" fill="url(#sky)"/>
  <rect x="20" y="10" width="1400" height="430" fill="#0E141C"/>
  {''.join(windows)}
  <rect x="0" y="440" width="1440" height="20" fill="#1A211C"/>
  <rect x="0" y="460" width="1440" height="440" fill="#121614"/>
  <ellipse cx="200" cy="200" rx="280" ry="120" fill="#9EE493" opacity=".04"/>
  <ellipse cx="1100" cy="160" rx="300" ry="140" fill="#3BAAF0" opacity=".05"/>
  {''.join(desks)}
  <rect x="40" y="500" width="16" height="220" fill="#1F3A2A"/>
  <ellipse cx="48" cy="490" rx="40" ry="28" fill="#2F6B4A"/>
  <rect x="1360" y="520" width="16" height="200" fill="#1F3A2A"/>
  <ellipse cx="1368" cy="510" rx="36" ry="24" fill="#2F6B4A"/>
  <rect x="0" y="820" width="1440" height="80" fill="#0B0D0C" opacity=".7"/>
</svg>'''


def game_box():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 460" fill="none">
  <title>Office Unfiltered game box</title>
  <defs>
    <filter id="boxs" x="-15%" y="-15%" width="130%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000" flood-opacity=".55"/>
    </filter>
  </defs>
  <g filter="url(#boxs)">
    <rect x="48" y="28" width="324" height="324" rx="18" fill="#141816"/>
    <rect x="48" y="28" width="324" height="324" rx="18" fill="none" stroke="#2A332E" stroke-width="3"/>
    <rect x="70" y="50" width="280" height="280" rx="8" fill="#0E1210"/>
    <text x="210" y="150" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="28" fill="#fff">OFFICE</text>
    <text x="210" y="186" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" fill="#9EE493">UNFILTERED</text>
    <rect x="96" y="220" width="228" height="1" fill="#2A332E"/>
    <text x="210" y="250" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" fill="#B7C2BA">AGE 16+</text>
    <text x="210" y="272" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" fill="#B7C2BA">PLAYERS 3–15</text>
    <text x="210" y="294" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" fill="#B7C2BA">TIME 30–90 MIN</text>
    <rect x="48" y="352" width="324" height="28" rx="4" fill="#0B0D0C"/>
  </g>
</svg>'''


def logo():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 56" fill="none">
  <title>Office Unfiltered</title>
  <text x="0" y="24" font-family="Plus Jakarta Sans, Arial Black, sans-serif" font-size="22" font-weight="800" letter-spacing="1.4" fill="#fff">OFFICE</text>
  <text x="0" y="48" font-family="Plus Jakarta Sans, Arial Black, sans-serif" font-size="18" font-weight="800" letter-spacing="1.6" fill="#9EE493">UNFILTERED</text>
</svg>'''


def workplace_pattern():
    return '''<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <g fill="none" stroke="currentColor" stroke-width="2" opacity=".35">
    <rect x="18" y="20" width="28" height="20" rx="3"/>
    <path d="M22 28h20"/>
    <circle cx="80" cy="30" r="10"/>
    <path d="M80 24 v6 l4 3"/>
    <path d="M120 18 l10 18 h-20z"/>
    <path d="M30 70 h24 M30 78 h16"/>
    <rect x="70" y="64" width="22" height="22" rx="3"/>
    <path d="M118 68 q12 12 0 24" />
    <circle cx="36" cy="124" r="8"/>
    <path d="M70 118 h28 v16 h-28z"/>
    <path d="M120 116 l14 0 0 20 -14 0"/>
  </g>
</svg>'''


def icon(name, inner, color="currentColor"):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="{color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <title>{name}</title>
  {inner}
</svg>'''


ICONS = {
    "truth": '<circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 11h1v5h1"/>',
    "dare": '<path d="M12 3c2 4 7 5 7 10a7 7 0 1 1-14 0c0-5 5-6 7-10z"/>',
    "scenario": '<path d="M5 6h10a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H11l-4 3v-3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z"/>',
    "archetype": '<circle cx="12" cy="8" r="3"/><path d="M5 19c1.5-3 4-5 7-5s5.5 2 7 5"/>',
    "safety": '<path d="M12 3 l8 4 v5 c0 5-3.5 8-8 10C7.5 20 4 17 4 12V7z"/><path d="M9 12 l2 2 4-4"/>',
    "users": '<circle cx="9" cy="8" r="3"/><circle cx="16" cy="9" r="2.4"/><path d="M3.5 19c.8-3 3-5 5.5-5s4.7 2 5.5 5M14 14c2 .2 3.8 1.6 4.6 4"/>',
    "join": '<rect x="4" y="5" width="12" height="14" rx="2"/><path d="M14 12h7M18 8l4 4-4 4"/>',
    "shield": '<path d="M12 3 l8 4 v5 c0 5-3.5 8-8 10C7.5 20 4 17 4 12V7z"/><path d="M9 12 l2 2 4-4"/>',
    "lock": '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    "trophy": '<path d="M8 4h8v3a4 4 0 0 1-8 0V4z"/><path d="M8 7H5a3 3 0 0 0 3 4M16 7h3a3 3 0 0 1-3 4"/><path d="M12 14v3M8 21h8M10 21c0-2 4-2 4 0"/>',
    "gear": '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.2M12 18.8V21M4.9 6.5l1.6 1.6M17.5 15.9l1.6 1.6M3 12h2.2M18.8 12H21M4.9 17.5l1.6-1.6M17.5 8.1l1.6-1.6"/>',
    "copy": '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>',
    "crown": '<path d="M3 16h18l-2-9-5 4-4-6-5 6z"/><path d="M5 16v3h14v-3"/>',
    "flame": '<path d="M12 3c2 4 7 5 7 10a7 7 0 1 1-14 0c0-3 2-5 4-7 0 3 2 4 3 4 0-2 0-5 0-7z"/>',
    "party": '<path d="M8 14 l-5 7 16-6"/><path d="M14 4l1 4 4 1-4 1-1 4-1-4-4-1 4-1z"/><path d="M5 6l.6 1.4L7 8l-1.4.6L5 10l-.6-1.4L3 8l1.4-.6z"/>',
    "question": '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2C12.3 12.4 12 13 12 14"/><circle cx="12" cy="17.2" r=".8" fill="currentColor"/>',
    "pause": '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
    "skip": '<path d="M6 7l8 5-8 5V7z"/><path d="M16 7v10"/>',
}


def avatar(name, skin, hair, shirt, extras=""):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <title>{name}</title>
  <circle cx="64" cy="64" r="64" fill="#1A211C"/>
  <circle cx="64" cy="64" r="62" fill="#202822"/>
  <path d="M20 128 C24 86 40 78 64 78 C88 78 104 86 108 128" fill="{shirt}"/>
  <circle cx="64" cy="58" r="28" fill="{skin}"/>
  {extras}
  <path d="M36 58 C38 32 50 24 64 24 C82 24 94 36 92 60 C88 42 78 34 64 34 C50 34 40 44 36 58Z" fill="{hair}"/>
  <ellipse cx="54" cy="58" rx="3.2" ry="4" fill="#2A241C"/>
  <ellipse cx="74" cy="58" rx="3.2" ry="4" fill="#2A241C"/>
  <path d="M56 70 Q64 76 72 70" fill="none" stroke="#C46A58" stroke-width="2" stroke-linecap="round"/>
</svg>'''


def main():
    write("assets/characters/nova.svg", nova())
    write("assets/characters/pulse.svg", pulse())
    write("assets/characters/logic.svg", logic())
    write("assets/characters/rise.svg", rise())
    write("assets/characters/atlas.svg", atlas())
    write("assets/characters/echo.svg", echo())
    write("assets/characters/spark.svg", spark())
    write("assets/characters/zen.svg", zen())
    write("assets/characters/link.svg", linkc())
    write("assets/characters/bold.svg", bold())
    write("assets/cards/safety-stop.svg", safety_stop())
    write("assets/cards/back.svg", card_back())
    write("assets/cards/workplace-pattern.svg", workplace_pattern())
    write("assets/backgrounds/office.svg", office_bg())
    write("assets/brand/game-box.svg", game_box())
    write("assets/brand/logo.svg", logo())

    write("assets/avatars/dave.svg", avatar("Dave", "#D2A679", "#2C2118", "#1F3A5F",
          '<path d="M42 72 C46 86 54 92 64 92 C74 92 82 86 86 72 C80 82 72 86 64 86 C56 86 48 82 42 72Z" fill="#3A2A20"/>'))
    write("assets/avatars/sarah.svg", avatar("Sarah", "#F7C9A8", "#F4D06A", "#F5D76E"))
    write("assets/avatars/michael.svg", avatar("Michael", "#E8B896", "#4A3728", "#3B6FA0",
          '<rect x="44" y="54" width="40" height="3" rx="1" fill="#2A241C"/><circle cx="54" cy="58" r="8" fill="none" stroke="#2A241C" stroke-width="2"/><circle cx="74" cy="58" r="8" fill="none" stroke="#2A241C" stroke-width="2"/>'))
    write("assets/avatars/jessica.svg", avatar("Jessica", "#C68642", "#2C1810", "#FF7A45"))
    write("assets/avatars/guest.svg", '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <circle cx="64" cy="64" r="64" fill="#1A211C"/>
  <circle cx="64" cy="52" r="22" fill="#3A4540"/>
  <path d="M28 112c4-22 18-32 36-32s32 10 36 32" fill="#3A4540"/>
</svg>''')

    for name, inner in ICONS.items():
        write(f"assets/icons/{name}.svg", icon(name, inner))


if __name__ == "__main__":
    main()
