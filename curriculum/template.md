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

$if(section.content.entry)$

<div class="sm:flex my-1">
<div class="sm:w-1/6 font-semibold">$section.content.entry.a$</div>
<div class="sm:w-5/6"><span class="font-bold">$section.content.entry.b$</span>$if(section.content.entry.c)$, <span class="italic">$section.content.entry.c$</span>$endif$$if(section.content.entry.d)$, $section.content.entry.d$$endif$$if(section.content.entry.e)$, $section.content.entry.e$$endif$.$if(section.content.entry.f)$<br/>$section.content.entry.f$$endif$</div>
</div>
$endif$

$if(section.content.item)$
<div class="sm:flex my-1">
<div class="sm:w-1/6 font-semibold">$section.content.item.a$</div>
<div class="sm:w-5/6">$section.content.item.b$</div>
</div>
$endif$

$if(section.content.bib)$

<Bibliography status="$section.content.bib$" />

$endif$

$endfor$

$endfor$
