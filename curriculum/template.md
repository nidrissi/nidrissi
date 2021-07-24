---
# $autoGen$
title: Curriculum Vitæ
lastMod: $lastMod$
urls:
  custom:
    - label: $otherVersion.label$
      url: $otherVersion.url$
    - label:
  customFile:
    - label: PDF version (English)
      file: cv.en.pdf
    - label: PDF version (French)
      file: cv.fr.pdf
---

import Bibliography from "../../../src/components/Bibliography"

$for(section)$

## $section.title$

$for(section.content)$
$if(section.content.subtitle)$

### $section.content.subtitle$

$endif$
$if(section.content.table)$

| | |
|-|-|
$endif$
$if(section.content.entry)$
| $section.content.entry.a$ | **$section.content.entry.b$**$if(section.content.entry.c)$, _$section.content.entry.c$_$endif$$if(section.content.entry.d)$, $section.content.entry.d$$endif$$if(section.content.entry.e)$, $section.content.entry.e$$endif$.$if(section.content.entry.f)$ <br />$section.content.entry.f$$endif$ |
$endif$
$if(section.content.item)$
| $section.content.item.a$ | $section.content.item.b$ |
$endif$
$if(section.content.bib)$
<Bibliography status="$section.content.bib$" />
$endif$
$endfor$

$endfor$
