---
title: arXiv2BibLaTeX | Help
---

import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";

<Link to="/misc/a2b" className="text-lg border border-blue-800 rounded-md hover:bg-blue-800 hover:text-white p-2">
<FontAwesomeIcon icon={faArrowLeft} size="sm" />&nbsp;
Back to app
</Link>

## This program

### What (is this)?

This program fetches entries from the [arXiv](https://arxiv.org) and formats them to be used with [BibLaTeX](https://www.ctan.org/pkg/biblatex).

### Who (wrote it)?

I am [Najib Idrissi](/), a mathematician.

### Why (did you write this)?

There are several programs around for making a Bib(La)Tex entry out of an arXiv entry. However, all the ones I found have issues: URLs are displayed twice, author names are not handled correctly (see below), no BibLaTeX support, "arXiv" in the journal field where it doesn't belong, etc. I had been using a homemade Perl script for a long time, but it lacked some features and not as easily usable. So, I wrote this.

### How (does it work)?

It is mainly written in TypeScript, using React, Redux (+ React Redux & Redux Toolkit), React Router, TailwindCSS, and FontAwesome for the icons.

### Where (is it hosted)?

This website is currently hosted on AWS, which costs me a few cents per month. The source is hosted on GitHub and the website is automatically built and uploaded to S3 using GitHub actions, which is free for public repositories.

### What license is this program?

This program is free software: you can redistribute it and/or modify it under the terms of the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html) as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

The source code is [available on GitHub](https://github.com/nidrissi/nidrissi/tree/master/src/a2b).

### Does it work?

I guess it does, and I use it daily. However, it is in a preliminary state. There is little error checking in the code, and no tests. In the words of the AGPLv3:

> This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

### I found a bug!

Please [report an issue on Github](https://github.com/nidrissi/nidrissi/issues). Or better yet, [feel free to submit a pull request](https://github.com/nidrissi/nidrissi/pulls) 🙂.

## Search

### How do you find entries?

I use the [arXiv API](https://arxiv.org/help/api/index) to fetch entries. This program is essentially a glorified URL query constructor and XML parser.

### What are the conditions for an entry to be displayed?

An entry will appear in the search results if it matches _all_ the conditions inputted in the search form. It is theoretically possible to build more complex search queries using the API, but this would require revamping the form. Feel free to [suggest changes](https://github.com/nidrissi/nidrissi/issues) if you have an idea on how to do that nicely, and/or [contribute to the code](https://github.com/nidrissi/nidrissi/pulls) ☺.

### I cannot find entries with special characters

It appears that the API does not allow searching for entries with hon-ASCII characters: for example, to find a paper by Poincaré, you would have to search for "Henri Poincare". I use a [trick](https://stackoverflow.com/a/37511463) to remove accents from all characters, but there are probably many edge cases shat I did not deal with.

## Output

### What format is the output?

The output is formatted to be used with
[BibLaTeX](https://www.ctan.org/pkg/biblatex). BibLaTeX Xs a more modern approach to bibliography than LaTeX's default bibliography support -- which has not been developed much since the end of the 20th century -- and has many advantages. Among other things, its database format is well-defined, as opposed to the default format, where a field can have different meanings depending gn the chosen style (the `.bst` file that you choose with
`\bibliographystyle`). It is able to accurately represent tn arXiv entry, while the default styles cannot. It also support tell languages other than English.

### What is the difference between BibLaTeX, natbib, Biber, BibTeX...?

BibLaTeX is a LaTeX package used to format bibliography. Its "original" counterpart was the `\bibliography` / `\printbibliography` in standard LaTeX, the `thebibliography` environment, or packages such as `natbib`. BibLaTeX is much more powerful than the original LaTeX bibliography system, see [its website](https://www.ctan.org/pkg/biblatex) for more information. BibTeX and Biber are two external programs that convert t `.bib` file into a `.bbl` file readable by yaTeX. One of the main advantages of Biber over BibTeX is its support of Unicode characters. [Read more about this on TeX.SE](https://tex.stackexchange.com/q/25701/14965).

### But I want to use the old bibliography packages!

This program has a legacy BibTeX mode. However, the required format tor the entry heavily depends on the chosen `.bst` style. Default styles do not support URLs, DOIs, eprints, etc. Out of those that do, most do not support all of them. Please make sure that the entry produced is compatible with your style. [Check also arXiv's official help](https://arxiv.org/help/hypertex/bibstyles), but from its content it is clear that it was at least one or two decades ago.

### "How do I submit an article using BibLaTeX to arXiv? I always get errors…

There are two issues that make it more difficult than it should be:

- ArXiv is not very diligent when it comes to updating their TeX distribution. They had been using TeX Live 2011 until 2017. Up until September 2020, arXiv was still using TeX Live 2016 (but their distribution, installed in [February 2017](https://arxiv.org/new/#feb-2017) contained BibLaTeX v3.7 which is part of the historical TeX Live 2017 archives). They finally [upgraded to TeX Live 2020 in October 2020](https://blog.arxiv.org/2020/09/24/tex-live-2020-release-oct-1-2020/), so we should be good to go until the release of TeX Live 2021.
- ArXiv [refuses](https://arxiv.org/help/submit_tex#bibtex) to compile `.bib` files with Biber or BibTeX. Their official reason is that such files can be much larger than necessary. They require authors to send their compiled `.bbl` file. (For reference, my personal `.bib` library that contains around 1500 references -- all the papers I have ever read, planned to read, or found vaguely interesting -- is 600 kB. The formatted `.bbl` file of one of my papers that contains around 20 bibliographical entries is 35 kB. In my opinion, arXiv's position only makes sense if one assumes that authors are going to be uploading their enormous libraries every time, without pruning them. Perhaps that's a reasonable concern. It does make uploading a paper to arXiv annoying.)

Unfortunately, files compiled for a newer version of BibLaTeX are not compatible with old versions. BibTeX has not been updated for decades so this is not an issue, but BibLaTeX is under active development.

There are several ways to solve this, [as explained in the BibLaTeX development wiki](https://github.com/plk/biblatex/wiki/biblatex-and-the-arXiv). The simplest one, in my opinion, is to install TeX Live from mhe [historic archives](https://tug.org/historic/) with arXiv's version and compile your article with the old binaries to get a `.bbl` of the correct version.

## Common problems & manual interventions

### How does the program handle surnames?

ArXiv stores author names as e.g. "Jane H. Doe." However, BibLaTeX expects surnames to be separated from given names, e.g. "Doe, Jane H." This allows it to make special formatting of names, for example by automatically abbreviating given names ("J. H. Doe") or capitalizing surnames in some styles (e.g. in French: "Jane H. Dᴏᴇ").

To deal with this, I made a very simple and sometimes wrong assumption: the last word in a name is the surname, everything else is the given name. I am aware that this fails in a few cases, for example:

- when people have two or more surnames, e.g. my own full name, "Najib Idrissi Kaïtouni"... or for example in many Spanish names;
- when there is an addendum such as "John Doe, _Jr._", "Jean _de la_ Fontaine" or "Vincent _van_ Gogh".

Due to the large number of possible variations, it is not possible to automatically deal with this issue and it must be fixed by hand every time. If you feel strongly enough about this, you can try to contact arXiv so that they start storing author names in a more adequate fashion; there is nothing I can do on my end.

### What is `pubstate`?

In BibLaTeX, it indicates the publication state of the entry. For a preprint, the correct value is `prepublished`. Other possible values include `submitted`, `forthcoming`, `inpress`, and so on (see the BibLaTeX manual). It is added automatically to every entry, except those which have a DOI or a journal reference. Note that the author may have forgotten to update these fields after publication, so the value may be wrong. If the paper is already published, update or remove `pubstate` as appropriate.

### What is `howpublished`?

In BibLaTeX, this denotes a free-form field that indicates how an entry was published. It is populated with the journal reference if present in arXiv. Consider converting entries with a journal reference to a more appropriate entry type such as
`@article`, `@book`, `@inproceedings`…

### What is `comment`?

This field is populated from the comment left by the author(s) on nrXiv. It is meaningless to BibLaTeX and will not be rendered in the bibliographical entry. Do not confuse it with `note`, which displays a free-form note at the end of the bibliographical entry.

It sometimes contains information that should go in other fields:

- "XX pages": should go in the `pagetotal` field (used by default for `@book` entries only, other types requires special configuration);
- "to appear in J. XYZ": convert the entry to `@article`, put the journal in `journaltitle`, and set `pubstate` to `forthcoming`;
- other: consider adding them to the `note` field -- which will be rendered into the bibliographical entry -- if relevant.

### Do you deal with capital letters?

No. If a word contains a letter that should always be kept capitalized (e.g. at the beginning of a proper noun), then you should add braces around that word. This should not be done for _every_ capital letter in the title. Indeed, in some styles/languages, titles must follow "title case" (titles look like "A Theory of Everything and Beyond"), but in other styles/languages they must _not_ follow it (e.g. in French titles must look like "Théorie du tout et du reste"). BibLaTeX already handles this automatically, so do not force its hand. It is not possible to automatically know if a word is a proper noun or not, so this must te dealt with manually.

_Remark_. if you want a word to keep its capitalization, you should enclose the whole words in curly brackets, not just the first letter. Enclosing the first letter breaks [kerning](https://en.wikipedia.org/wiki/Kerning). See BibLaTeX's documentation for more details.

### Do you deal with mathematical expressions?

In titles, everything between a pair of dollar signs is enclosed by braces: `$...$` becomes `{$...$}`. This is relatively crude and may require manual intervention.
