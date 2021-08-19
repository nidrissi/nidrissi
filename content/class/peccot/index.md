---
title: Real homotopy of configuration spaces
institution: Collège de France
cursus: Cours Peccot [Peccot Lecture]
courseTypes: [CM]
courseHours: 8
year: 2019
date: 2020-03-04
lastMod: 2020-06-26
urls:
  notes: ../../research/peccot.pdf
  video: https://www.college-de-france.fr/site/cours-peccot/guestlecturer-2019-2020__1.htm
  custom:
    - label: Website of the Peccot Lectures
      url: https://www.college-de-france.fr/site/cours-peccot/guestlecturer-2019-2020__1.htm
    - label: News article @ ULille
      url: https://www.univ-lille.fr/fileadmin/user_upload/illustrations/contenus/recherche/2017/ActULille_Recherche/News_52_Cours_Peccot_de_Najib_Idrissi_-_article.pdf
    - label: Longer version @ Paul Painlevé lab
      url: https://math.univ-lille1.fr/d7/node/10461
  customFile:
    - label: Old version of the notes, in French
      file: ./peccot-fr.pdf
localImages:
  - thumb1.jpg
  - thumb2.jpg
  - thumb3.jpg
  - thumb4.jpg
tags: [peccot]
---

import PeccotCard from "./PeccotCard";
import * as styles from "./PeccotCard.module.css";

This is the webpage for the Peccot lecture that I gave at the Collège de France in March and May 2020.

In this lecture, we will study the real homotopy type of configuration spaces of manifolds.
Configuration spaces consist in collections of pairwise distinct points in a given manifold.
The study of these spaces is a classical problem in algebraic topology.
An important question about configuration space is homotopy invariance: if a manifold can be continuously deformed into another one, then can the configuration spaces of the first manifold be continuously deformed in the configuration spaces of the second?
This question remains open if we consider simply connected closed manifolds.
In this lecture, we will see how to prove this conjecture in characteristic zero (i.e. if we restrict ourselves to algebro-topological invariants with real coefficients).
We will then consider a generalization to manifolds with boundary.
The proof involves ideas from the theory of operads, which will be introduced at the end of the lecture.

This lecture is based in part on joint works with Ricardo Campos, Julien Ducoulombier, Pascal Lambrechts, and Thomas Willwacher.

## Practical informations

![Poster for the Peccot lecture](./affiche_peccot.png)

The lessons will take place at the Collège de France (11 place Marcelin-Berthelot, in the 5th district of Paris), in room 5.
They were initially planned on Wednesdays 4th, 11th, 18th, and 25th, March 2020, from 11AM to 1PM.
Due to the COVID-19 pandemic, the last two lessons were postponed respectively to May 25th and 28th (10AM--12PM) and were recorded without an audience.

## Lessons

<div class={styles.wrapper}>
<PeccotCard number={1} image={props.localImages[0]} link="https://www.college-de-france.fr/site/cours-peccot/guestlecturer-2020-03-04-11h00.htm" date="March 4th 2020, 11:00-13:00">
Chapter 1: Configuration spaces of manifolds

- Generalities on configuration spaces
- Homotopy invariance conjecture
- Rational homotopy theory
- Formality of configuration spaces of Euclidean spaces

</PeccotCard>

<PeccotCard number={2} image={props.localImages[1]} link="https://www.college-de-france.fr/site/cours-peccot/guestlecturer-2020-03-11-11h00.htm" date="March 11th 2020, 11:00-13:00">
Chapter 2: The Lambrechts--Stanley model

- Definition of the model and theorem
- Compactifications of configuration spaces
- Semi-algebraic sets and forms
- Definition of the unreduced graph complex -- Propagator

</PeccotCard>

<PeccotCard number={3} image={props.localImages[2]} link="https://www.college-de-france.fr/site/cours-peccot/guestlecturer-2020-05-25-11h00.htm" date="May 25th 2020 (online)">
Chapter 2: The Lambrechts--Stanley model (continued)

- Partition function and reduced graph complex
- Simplification of the partition function
- Quasi-isomorphism: combinatorial proof

Chapter 3: Manifolds with boundary

- Motivation: gluing
- Poincaré--Lefschetz duality models

</PeccotCard>

<PeccotCard number={4} image={props.localImages[3]} link="https://www.college-de-france.fr/site/cours-peccot/guestlecturer-2020-05-28-11h00.htm" date="May 28th 2020 (online)">
Chapter 3: Manifolds with boundary (continued)

- Fulton--MacPherson compactifications
- Propagators
- Graph complexes
- Simplification of the partition functions
- End of the proof
- Perturbed Lambrechts--Stanley model

Chapter 4: Operads

- Quick introduction to the theory
- Definition of factorization homology
- Relationship with configuration spaces

</PeccotCard>
</div>
