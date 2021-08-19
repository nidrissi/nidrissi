---
title: "Homotopy II"
institution: Université de Paris
cursus: M2 Fundamental Mathematics (S2)
courseTypes: [CM]
courseHours: 24
year: 2020
date: 2021-01-01
lastMod: 2021-04-02
urls:
  notes: ../21-22-homotopie/homotopie.pdf
  video: https://www.youtube.com/playlist?list=PLTt5PyNwzdilR4GnUNxvTBGlKzma9imTf
  custom:
    - label: M2 Fundamental mathematics
      url: https://master-math-fonda.imj-prg.fr/
    - label: Discord
      url: https://discord.com/channels/772392315159314472/772392315159314475
  customFile:
    - label: Solved homework
      file: devoir.pdf
    - label: Exam (en)
      file: examen-en.pdf
    - label: Exam (fr)
      file: examen-fr.pdf
    - label: Solved exam (fr)
      file: examen-fr-corrige.pdf
---

import * as styles from "./HomotopyCard.module.css";
import HomotopyCard from "./HomotopyCard.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

## Introduction

The goal of this course is to introduce modern homotopy theory, its tools and applications.
We will be particularly interested in two examples: chain complexes (see the previous Homology course) and topological spaces.
We will present Quillen's model categories, and we will explain the equivalence between topological spaces and simplicial sets.
We will illustrate these methods with rational homotopy theory by showing that multiplicative structures of cochains encodes rational homotopy types of topological spaces.

<AlertDiv color="red">
  <FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;This is the page for the 2020&ndash;2021 lecture. <a href="/class/21-22-homotopie">See here for the 2021&ndash;2022 page</a>.
</AlertDiv>

### Prerequisites

It is recommended to have taken the courses [_Homology_ (by Emmanuel Wagner)](https://moodle.u-paris.fr/course/view.php?id=11052) and [_Homotopy I_ (by Bruno Vallette)](https://www.math.univ-paris13.fr/~vallette/Course-Master%20II-2020.html).
It will be useful to have a certain familiarity with categorical language and with basic notions of algebraic topology and homological algebra.

### Plan of the course

1. Model categories.
2. Chain complexes.
3. Simplicial sets and topological spaces.
4. Rational homotopy theory.

### After this course

- The course [_Higher categories_ (by Muriel Livernet)](https://webusers.imj-prg.fr/~muriel.livernet/enseignement/index.html) is a natural continuation of this course and a conclusion to the "homotopy" sequence of the master's degree (Homology -- Homotopy I/II -- Higher categories).
- I gave in 2020 a [Peccot lecture entitled _Real homotopy of configuration spaces_](/class/peccot) at the Collège de France which gave concrete applications of the methods presented here.

## Organization

Lectures happened on Mondays 10:45--12:45 and Fridays 15:45--17:45.
They began on January 11<sup>th</sup> and ended on February 19<sup>th</sup>.
All lectures were online (via Zoom).
The sessions were recorded and [they are now available on YouTube](https://www.youtube.com/playlist?list=PLTt5PyNwzdilR4GnUNxvTBGlKzma9imTf).

The exam was on Friday, March 5th, 14:00--17:00, in room 207C of the [Halle aux Farines](../19-20-homotopie/HAF.pdf).
It was an open-book exam: students had access to printed and handwritten lecture notes.
Electronic devices were forbidden.

The retake exam (_rattrapage_) was be on June 15<sup>th</sup>.
It consisted in oral exams lasting around 30 minutes total per student.
In-person sessions were in the morning between 9AM and 1PM, in the Sophie Germain building, room 1014.
Online sessions for students that cannot be physically present in Paris at that time were in the afternoon.

## Lectures

<div class={styles.wrapper}>
<HomotopyCard number={1} date="2021-01-11" hours="10:45-12:45" video="https://youtu.be/cilKcPVEnX0">
  Analogies between different homotopy theories: topological spaces, simplicial sets, chain complexes. Motivation for the definition of model categories. (Co)fibrations vs. injections/surjections. Definition of model categories. (Sections 1.1 and 1.2)
</HomotopyCard>

<HomotopyCard number={2} date="2021-01-15" hours="15:45-17:45" video="https://youtu.be/RSANbPkQaFw">
  Definition of model categories and first examples (Section 1.3)
</HomotopyCard>

<HomotopyCard number={3} date="2021-01-18" hours="10:45-12:45" video="https://youtu.be/AA1WQWUG2II">
  Definition and construction of the localization of a category with respect to a class of weak equivalence, definition of left homotopies, first properties, dual case of right homotopies (Sections 1.4.1 and 1.4.2).
</HomotopyCard>

<HomotopyCard number={4} date="2021-01-22" hours="15:45-17:45" video="https://youtu.be/PEEUQ21TF2E">
  End of Section 1.4: explicit description of the homotopy category of a model category, Whitehead theorem.
</HomotopyCard>

<HomotopyCard number={5} date="2021-01-25" hours="10:45-12:45" video="https://youtu.be/DICgkRcuR0s">
  Section 1.5.1: The proof of the existence of the projective model structure on the category of bounded-below chain complexes.
</HomotopyCard>

<HomotopyCard number={6} date="2021-01-29" hours="15:45-17:45" video="https://youtu.be/0oIAdwMu_nY">
  Existence theorem for cofibration generated model categories (Section 1.5.2), Quillen adjunctions (beginning of Section 1.6).
</HomotopyCard>

<HomotopyCard number={7} date="2021-02-01" hours="10:45-12:45" video="https://youtu.be/bv0oGULtfaw">
  Definition of Quillen equivalences and characterization, homotopy limits and colimits.
</HomotopyCard>

<HomotopyCard number={8} date="2021-02-05" hours="15:45-17:45" video="https://youtu.be/3jz0g8RVPS8">
  Reminders on simplicial sets and beginning of the proof of the existence of the Quillen model structure on the category of simplicial sets (Sections 2.1, 2.2, 2.3, and beginning of 2.4).
</HomotopyCard>

<HomotopyCard number={9} date="2021-02-8" hours="10:45-12:45" video="https://youtu.be/LEgUKKzM8KE">
  Continuation of the proof of the existence of the Quillen model structure on simplicial sets, anodynes extensions, simplicial homotopy groups.
</HomotopyCard>

<HomotopyCard number={10} date="2021-02-12" hours="15:45-17:45" video="https://youtu.be/gckfIqqkO-U">
  End of the proof of the Quillen equivalence between simplicial sets and topological spaces. Left Bousfield localization and rational homotopy theory.
</HomotopyCard>

<HomotopyCard number={11} date="2021-02-15" hours="10:45-12:45" video="https://youtu.be/UDbgtU00wpg">
  Transferred model structure on CDGAs and Sullivan algebras.
</HomotopyCard>

<HomotopyCard number={12} date="2021-02-19" hours="15:45-17:45" video="https://youtu.be/tp8uJpazaaM">
  Equivalence between CDGAs and rational homotopy types through the PL forms. Applications of Sullivan's theory: models of spaces, dichotomy theorem, etc.
</HomotopyCard>
</div>

## Bibliography

[I have written lecture notes which are available here.](homotopie.pdf)
I also gave a [similar course last year](/class/19-20-homotopie); you can in particular find past exams on that webpage.
Grégory Ginot gave a [course in 2017--2018--2019 on the same subject](https://www.math.univ-paris13.fr/~ginot/Homotopie/).
You can find on his page [his lecture notes](https://www.math.univ-paris13.fr/%7Eginot/Homotopie/Ginot-homotopie2019.pdf), as well as past exercise sheets and exams.

Works on homotopy theory:

- **William G. Dwyer et Jan Spaliński. "Homotopy theories and model categories".** In: _Handbook of algebraic topology_. Amsterdam: North-Holland, 1995, pp. 73--126. [DOI:10.1016/B978-044481779-2/50003-1](https://dx.doi.org/10.1016/B978-044481779-2/50003-1). [MR1361887](https://www.ams.org/mathscinet-getitem?mr=1361887). [Zbl:0869.55018](https://zbmath.org/?q=an%3A0869.55018). (Introduction to model categories.)
- **Yves Félix, Stephen Halperin et Jean-Claude Thomas. _Rational Homotopy Theory_.** Graduate Texts in Mathematics 205. New York : Springer, 2001, p. xxxiv+535. ISBN: 0-387-95068-0. DOI: [10.1007/978-1-4613-0105-9](https://doi.org/10.1007/978-1-4613-0105-9). (Reference book on rational homotopy theory.)
- **Paul G. Goerss et John F. Jardine. _Simplicial homotopy theory_.** Progress in Mathematics 174. Basel: Birkhäuser , 1999, pp. xvi+510. ISBN: 3-7643-6064-X. [DOI:10.1007/978-3-0348-8707-6](https://doi.org/10.1007/978-3-0348-8707-6). [MR1711612](https://www.ams.org/mathscinet-getitem?mr=1711612). [Zbl:0949.55001](https://zbmath.org/?q=an%3A0949.55001). (Book on simplicial sets and their homotopical properties.)
- **Phillip Griffiths et John Morgan. _Rational homotopy theory and differential forms_.** 2nd ed. Progress in Mathematics 16. New York: Springer, 2013. 224 p. ISBN: 978-1-4614-8467-7. DOI: [10.1007/978-1-4614-8468-4](https://doi.org/10.1007/978-1-4614-8468-4). (Notes on rational homotopy theory)
- **Kathryn Hess. "Rational homotopy theory: a brief introduction".** In: _Interactions between homotopy theory and algebra_. Contemp. Math. 436. Providence, RI: Amer. Math. Soc., 2007, pp. 175--202. [DOI:10.1090/conm/436/08409](https://dx.doi.org/10.1090/conm/436/08409). [arXiv:math/0604626](https://arxiv.org/abs/math/0604626). [MR2355774](https://www.ams.org/mathscinet-getitem?mr=2355774). [Zbl:1128.55010](https://zbmath.org/?q=an%3A1128.55010). (Introduction to rational homotopy theory)
- **Mark Hovey. _Model categories_.** Mathematical Surveys and Monographs 63. Providence, RI: American Mathematical Society, 1999, pp. xii+209. ISBN: 0-8218-1359-5. [MR1650134](https://www.ams.org/mathscinet-getitem?mr=1650134). [Zbl:0909.55001](https://zbmath.org/?q=an%3A0909.55001). (Book on model categories.)
- **Jacob Lurie. _Higher topos theory_.** Annals of Mathematics Studies 170. Princeton, NJ: Princeton University Press, 2009, pp. xviii+925. ISBN: 978-0-691-14049-0. [MR2522659](https://www.ams.org/mathscinet-getitem?mr=2522659). [Zbl:1175.18001](https://zbmath.org/?q=an%3A1175.18001) (Very complete book on $\infty$-categories.)

Reminders on algebraic topology and homological algebra:

- **Glen E. Bredon. _Topology and geometry_.** Graduate Texts in Mathematics 139. New York: Springer, 1993, pp. xiv+557. ISBN: 0-387-97926-3. [DOI:10.1007/978-1-4757-6848-0](https://dx.doi.org/10.1007/978-1-4757-6848-0). [MR1224675](https://www.ams.org/mathscinet-getitem?mr=1224675). [Zbl:0791.55001](https://zbmath.org/?q=an%3A0791.55001). ((Algebraic) topology and (differential) geometry textbook.)
- **Allen Hatcher. _Algebraic topology_.** Cambridge: Cambridge University Press, 2002, pp. xii+544. ISBN: 0-521-79160-X. [MR1867354](https://www.ams.org/mathscinet-getitem?mr=1867354). [Zbl:1044.55001](https://zbmath.org/?q=an%3A1044.55001) (Algebraic topology textbook.)
- **Henri Paul de Saint-Gervais. _[Analysis Situs](http://analysis-situs.math.cnrs.fr)_.** (Lecture notes on algebraic topology, in French.)
- **Pierre Schapira. _Categories and homological algebra_.** (Lecture notes on derived categories.)
- **Edwin Spanier. _Algebraic topology_.** Berlin: Springer, 1995, pp. xiv+528. ISBN: 978-1-4684-9322-1. [DOI:10.1007/978-1-4684-9322-1](https://dx.doi.org/10.1007/978-1-4684-9322-1). [MR210112](https://mathscinet.ams.org/mathscinet-getitem?mr=210112). [Zbl:0145.43303](https://zbmath.org/?q=an%3A0145.43303). (Algebraic topology textbook.)
- **Charles A. Weibel. _An Introduction to homological algebra_.** Cambridge Studies in Advanced Mathematics 38. Cambridge: Cambridge University Press, 1994, pp. xiv+450. ISBN: 0-521-43500-5. [MR1269324](https://www.ams.org/mathscinet-getitem?mr=1269324). [Zbl:0797.18001](https://zbmath.org/?q=an%3A0797.18001). (Homological algebra textbook.)
