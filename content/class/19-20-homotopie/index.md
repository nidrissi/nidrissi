---
title: "Introduction to Homotopy Theory"
institution: Université de Paris
cursus: M2 Fundamental Mathematics (S2)
courseTypes: [CM]
courseHours: 24
year: 2019
date: 2020-01-01
lastMod: 2020-04-30
urls:
  notes: ../20-21-homotopie/homotopie.pdf
  custom:
    - label: M2 Fundamental mathematics
      url: https://master-math-fonda.imj-prg.fr/
  customFile:
    - label: Exam
      file: examen.pdf
    - label: Solved exam
      file: examen-corrige.pdf
---

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

## Introduction

The goal of this course is to give an introduction to modern homotopy theory, its tools, and its applications, as well as to introduce the notion of $\infty$-category. We will essentially follow two examples: the founding example of topological spaces and the example of chain complexes (in the sense of homological algebra and algebraic topology). We will present the modern axiomatic treatement of homotopy theory -- Quillen's model categories -- and we will explain the equivalence between topological spaces and simplicial sets. We will illustrate these methods through the example of rational homotopy theory, showing how the multiplicative structure of cochains -- singular or de Rham -- encode topological spaces up to rational homotopy.

<div class="bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100 py-1 px-2 rounded-sm">
  <FontAwesomeIcon icon={faExclamationTriangle} title="Warning!" />
  &nbsp;
  This is the page for the 2019&ndash;2020 lecture. <a href="/class/21-22-homotopie">See here for the 2021&ndash;2022 page</a>.
</div>

### Prerequisites

It is advised to have already taken a class on algebraic topology as well as an introduction to homological algebra.

### Plan

1. Model Categories.
2. Quillen functors and derived functors.
3. Comparison between simplicial sets and topological spaces.
4. Rational homotopy.
5. Notion of $\infty$-category theory.

## Organization

Lectures will start on January 6th, 2020 and end on February 13th, 2020.

The first two weeks, they will happen on:

- Mondays 15:45--17:45, [Sophie Germain building](https://www.math.univ-paris-diderot.fr/ufr/acces), room 1012.
- Tuesdays 14:00--16:00, [Sophie Germain building](https://www.math.univ-paris-diderot.fr/ufr/acces), room 2016.

The last four weeks, they will happen on:

- Tuesdays 14:00--16:00, [Sophie Germain building](https://www.math.univ-paris-diderot.fr/ufr/acces), room 2016 (_except on February 11th: room 2017_).
- Thursdays 9:00--11:00, [Halles aux Farines](./HAF.pdf), room 280F (_except February 6th: moved to the 3rd_).

The session of February 6th is moved to Monday, February 3rd, between 16:15 and 18:15, in the room 137 of the Olympe de Gouges building.

The optional homework (to hand in if you would like some feedback) was due on February 4th.

The updated solution [is available on the page of the 2020--2021 lecture](/class/20-21-homotopie).

The [exam](/examen.pdf) was on Tuesday, February 18th, between 14:00 and 17:00, in the room 1009 of the Sophie Germain building.
It covered chapters 1 and 2.
[The solution can be found here.](/examen-corrigé.pdf)

| Date | Content |
|------|---------|
| Monday January 6th | Section 1.1: Motivation, parallels between topological spaces and chain complexes (homotopy equivalences, weak equivalences, Whitehead theorem(s), models). |
| Tuesday January 7th | Section 1.2: Fibrations, cofibrations, lifting properties, long exact sequences. |
| Monday January 13th | Section 1.3: Categorical reminders. Beginning of Section 1.4: Definition of model categories. |
| Tuesday January 14th | Section 1.4: some examples of model categories, a few properties. Section 1.5: Localization in the general case, definition of left homotopies. |
| Tuesday January 21th | Section 1.5: end of the description of the homotopy category as a quotient of the category of fibrant-cofibrant objects. |
| Thursday January 23rd | Section 1.6: Cofibrantly generated model categories, small object argument. |
| Tuesday January 28th | Section 1.7: Quillen adjunctions and equivalences. Section 1.8: Homotopy (co)limits. |
| Thursday January 30th | Sections 2.1--2.3: Introduction to simplicial sets. |
| Monday February 3rd (<FontAwesomeIcon icon={faExclamationTriangle} title="Warning!" />&nbsp;16:15--18:15) | Sections 2.4--2.5: Model structure on simplicial sets, beginning of the equivalence with topological spaces. |
| Tuesday February 4th | Sections 2.5--2.6: End of the equivalence with topological spaces. Dold--Kan correspondence. Section 3.1: Localization with respect to rational equivalences. |
| ~~Thursday February 6th~~ | Moved to February 3rd. |
| Tuesday February 11th (<FontAwesomeIcon icon={faExclamationTriangle} title="Warning!" />&nbsp;room 2017) | Sections 3.2--3.3: Model structure on CDGAs, Sullivan theory, comparison with simplicial sets up to rational equivalence. |
| Thursday February 13th | Chapter 3: Some applications of rational homotopy theory. Chapter 4: Very bried introduction to $\infty$-categories. |

## Bibliography

Grégory Ginot gave [a course in 2017--2019 on the same topic](https://www.math.univ-paris13.fr/~ginot/Homotopie).
On his webpage, you can find [his lecture notes](https://www.math.univ-paris13.fr/%7Eginot/Homotopie/Ginot-homotopie2019.pdf), as well as past exercise sheets and past exams.

Works on homotopy theory:

- **William G. Dwyer et Jan Spaliński. "Homotopy theories and model categories".** In: _Handbook of algebraic topology_. Amsterdam: North-Holland, 1995, pp. 73--126. [DOI:10.1016/B978-044481779-2/50003-1](https://dx.doi.org/10.1016/B978-044481779-2/50003-1). [MR1361887](https://www.ams.org/mathscinet-getitem?mr=1361887). [Zbl:0869.55018](https://zbmath.org/?q=an%3A0869.55018). (Introduction to model categories.)
- **Yves Félix, Stephen Halperin et Jean-Claude Thomas. _Rational Homotopy Theory_.** Graduate Texts in Mathematics 205. New York : Springer, 2001, p. xxxiv+535. ISBN : 0-387-95068-0. DOI : [10.1007/978-1-4613-0105-9](https://doi.org/10.1007/978-1-4613-0105-9). (Reference book on rational homotopy theory.)
- **Paul G. Goerss et John F. Jardine. _Simplicial homotopy theory_.** Progress in Mathematics 174. Basel: Birkhäuser , 1999, pp. xvi+510. ISBN: 3-7643-6064-X. [DOI:10.1007/978-3-0348-8707-6](https://doi.org/10.1007/978-3-0348-8707-6). [MR1711612](https://www.ams.org/mathscinet-getitem?mr=1711612). [Zbl:0949.55001](https://zbmath.org/?q=an%3A0949.55001). (Book on simplicial sets and their homotopical properties.)
- **Kathryn Hess. "Rational homotopy theory: a brief introduction".** In: _Interactions between homotopy theory and algebra_. Contemp. Math. 436. Providence, RI: Amer. Math. Soc., 2007, pp. 175--202. [DOI:10.1090/conm/436/08409](https://dx.doi.org/10.1090/conm/436/08409). [arXiv:math/0604626](https://arxiv.org/abs/math/0604626). [MR2355774](https://www.ams.org/mathscinet-getitem?mr=2355774). [Zbl:1128.55010](https://zbmath.org/?q=an%3A1128.55010).
- **Mark Hovey. _Model categories_.** Mathematical Surveys and Monographs 63. Providence, RI: American Mathematical Society, 1999, pp. xii+209. ISBN: 0-8218-1359-5. [MR1650134](https://www.ams.org/mathscinet-getitem?mr=1650134). [Zbl:0909.55001](https://zbmath.org/?q=an%3A0909.55001). (Book on model categories.)
- **Jacob Lurie. _Higher topos theory_.** Annals of Mathematics Studies 170. Princeton, NJ: Princeton University Press, 2009, pp. xviii+925. ISBN: 978-0-691-14049-0. [MR2522659](https://www.ams.org/mathscinet-getitem?mr=2522659). [Zbl:1175.18001](https://zbmath.org/?q=an%3A1175.18001) (Very complete book on $\infty$-categories.)

Reminders on algebraic topology and homological algebra:

- **Glen E. Bredon. _Topology and geometry_.** Graduate Texts in Mathematics 139. New York: Springer, 1993, pp. xiv+557. ISBN: 0-387-97926-3. [DOI:10.1007/978-1-4757-6848-0](https://dx.doi.org/10.1007/978-1-4757-6848-0). [MR1224675](https://www.ams.org/mathscinet-getitem?mr=1224675). [Zbl:0791.55001](https://zbmath.org/?q=an%3A0791.55001). ((Algebraic) topology and (differential) geometry textbook.)
- **Allen Hatcher. _Algebraic topology_.** Cambridge: Cambridge University Press, 2002, pp. xii+544. ISBN: 0-521-79160-X. [MR1867354](https://www.ams.org/mathscinet-getitem?mr=1867354). [Zbl:1044.55001](https://zbmath.org/?q=an%3A1044.55001) (Algebraic topology textbook.)
- **Henri Paul de Saint-Gervais. _[Analysis Situs](http://analysis-situs.math.cnrs.fr)_.** (Lecture notes on algebraic topology, in French.]
- **Pierre Schapira. _Categories and homological algebra_.** (Lecture notes on derived categories.)
- **Edwin Spanier. _Algebraic topology_.** Berlin: Springer, 1995, pp. xiv+528. ISBN: 978-1-4684-9322-1. [DOI:10.1007/978-1-4684-9322-1](https://dx.doi.org/10.1007/978-1-4684-9322-1). [MR210112](https://mathscinet.ams.org/mathscinet-getitem?mr=210112). [Zbl:0145.43303](https://zbmath.org/?q=an%3A0145.43303). (Algebraic topology textbook.)
- **Charles A. Weibel. _An Introduction to homological algebra_.** Cambridge Studies in Advanced Mathematics 38. Cambridge: Cambridge University Press, 1994, pp. xiv+450. ISBN: 0-521-43500-5. [MR1269324](https://www.ams.org/mathscinet-getitem?mr=1269324). [Zbl:0797.18001](https://zbmath.org/?q=an%3A0797.18001). (Homological algebra textbook.)
