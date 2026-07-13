---
title: Building the Fighter and the Tools Behind It
date: 13/07/2026
kicker: Development Log #003
version: v0.0.3
category: Development
tags: Godot, Rat Forge, Animation, Combat Systems, AI Development
---

Since choosing Godot as the engine for Rat Fighter, development has moved beyond planning and into building the systems that will eventually support the full game.

The project is still at an early stage, but it is no longer just a collection of character ideas, artwork and design documents. There is now a working fighting game prototype, alongside a separate animation tool being developed specifically to solve one of the largest challenges in the project: creating consistent character animations.

## Building the Godot Prototype

The first priority was getting the basic structure of a fighting game working inside Godot.

A reusable fighter controller and state system were created to handle the core actions each character will need. This currently includes:

- Walking forwards and backwards.
- Jumping and landing.
- Crouching.
- Blocking.
- Taking damage.
- Knockback and hit reactions.
- Basic punches and kicks.
- Throws.
- Projectile collisions.
- Simple combo tracking.

The combat prototype now supports light, medium and heavy attacks for both punches and kicks, along with basic hit detection, blocking, chip damage, hitstop, hit flashes and block sparks.

These systems are still using placeholder visuals, but they have allowed the timing and structure of the combat to begin taking shape before the finished character sprites are added.

## Rounds, Health and Match Flow

The surrounding match systems have also been built.

The game now includes:

- Player health bars.
- A match timer.
- Round announcements.
- Knockout handling.
- Best-of-three round logic.
- A pause menu.
- A basic stage selection screen.
- Training mode options.
- A simple AI opponent.

The AI can currently approach the player, guard, jump and attack. It is deliberately basic at this stage, but it provides something to fight against while the combat systems are being developed.

Several early problems have already been identified and corrected, including players moving before the round officially started, blocking preventing normal backwards movement and characters landing on top of each other.

Fixing these issues now is important because every future fighter will eventually depend on the same underlying systems.

## Starting With a Vertical Slice

The plan remains to complete a small but polished section of the game before attempting to build the full roster.

The first playable version will focus on:

- Two finished characters.
- One complete stage.
- A working arcade match.
- Responsive combat.
- Character-specific moves.
- Basic sound and visual effects.
- Proper menus and arcade presentation.

Once that foundation feels good, additional characters and stages can be added without rebuilding the entire game each time.

The current Godot prototype is effectively the skeleton of that vertical slice.

## The Animation Problem

As the combat systems improved, the biggest obstacle became increasingly clear.

A fighting game can have strong code, responsive controls and good mechanics, but none of it works without a large number of consistent character animations.

Each fighter will eventually require idle animations, movement, jumps, blocks, hit reactions, knockdowns, punches, kicks, throws, special moves, intros and victory poses.

For a roster of more than twenty characters, drawing and preparing every frame manually would take an enormous amount of time.

Existing AI animation tools can produce interesting results, but they often struggle with the consistency needed for a fighting game. Faces change, limbs warp, clothing shifts between frames and characters slide around instead of remaining anchored to the ground.

That led to the creation of a separate tool.

## Building Rat Forge

Rat Forge is a custom character preparation and animation workspace being developed alongside the game.

Its purpose is to create a controlled pipeline for turning a character design into organised, game-ready animation assets.

Rather than asking an AI model to generate a complete animation with no structure, Rat Forge is being designed to provide the AI with clear information about the character, pose, body parts, proportions, ground position and intended movement.

The project is being built as a React and TypeScript desktop-style web application.

## Character Projects

Rat Forge now supports project-based character files.

Each character project can store:

- Reference artwork.
- Character height and proportions.
- Canonical idle placement.
- Animation assets.
- Body-part tags.
- Move checklists.
- Combat data.
- AI animation jobs.
- Reusable animation templates.

The canonical idle pose acts as the main source of truth.

Every animation should begin from, or return cleanly to, the character's idle position. This helps prevent the character from changing scale, drifting across the canvas or becoming misaligned between moves.

## The 320 x 320 Animation Canvas

Rat Forge uses a fixed 320 x 320 pixel canvas to match the intended sprite format for Rat Fighter.

The character reference can be positioned against a ground line and scaled according to the character's actual height. This allows different fighters to maintain believable proportions while still sharing the same animation frame size.

Tools have also been added for checking whether the character's feet remain locked to the ground.

This is especially important for idle animations and standing attacks, where even a few pixels of movement can make the character appear to slide or float.

## Separating the Character Into Parts

One of the main Rat Forge workflows is dividing the character into individual body parts.

The current plan includes separate sections for:

- Head and face.
- Hair.
- Torso and neck.
- Pelvis and hips.
- Upper and lower arms.
- Hands.
- Upper and lower legs.
- Feet.
- Clothing and accessories.

These parts can then be masked, tagged and assigned pivots.

The long-term goal is to allow body parts to be repositioned while preserving the character's appearance, rather than regenerating the entire fighter for every frame.

This should make it easier to create controlled poses, repair individual limbs and keep proportions consistent across an animation.

## Timeline and Animation Workspace

Rat Forge now contains an early timeline system for organising frames and animation assets.

The timeline is still being refined, but the basic structure is in place for building moves frame by frame.

Each animation will eventually be able to store more than artwork. It will also carry the information required by the game, including:

- Frame duration.
- Hitboxes.
- Hurtboxes.
- Movement.
- Damage.
- Knockback.
- Cancel windows.
- Sound effects.
- Visual effects.
- Grounding rules.

This means Rat Forge is not intended to be only an art tool.

The eventual goal is to export both the finished sprite animation and the combat data needed by Godot.

## Animation Templates

A reusable animation template system has also been added.

Templates can store information such as:

- Pose guides.
- Limb locks.
- Rig constraints.
- Prompt fragments.
- Default AI settings.
- Character-independent movement rules.

The first templates currently cover an idle pose and a jab.

Instead of rewriting the same instructions for every character, a template can describe the structure of the movement while the character project provides the individual appearance and proportions.

For example, the jab template can specify that the front hand performs a short straight punch while the rear hand remains in guard and both feet stay grounded.

That same movement structure can then be applied to different fighters.

## AI Integration

Rat Forge has also begun integrating with the Black Forest Labs FLUX API.

The connection and local backend are now in place, although reliable animation generation is still being tested and debugged.

The intention is not to press one button and expect a perfect finished animation.

The intended workflow is:

1. Load the character project.
2. Select an animation template.
3. Apply pose and limb constraints.
4. Generate or transform a frame.
5. Review the result.
6. Correct any inconsistent body parts.
7. Clean up the final frames manually.
8. Export the animation and combat data to Godot.

AI should reduce the amount of repetitive drawing and provide useful starting points, while Rat Forge supplies the control that general image and video tools currently lack.

## Damage and Gore Systems

The animation pipeline is also being designed with damage states in mind.

As a fighter loses health, the character may gradually appear more bruised, bloodied or damaged.

Rather than redrawing every animation several times, the current idea is to use layered damage overlays that can be applied across existing animations.

Possible states include:

- Light facial bruising.
- Torn clothing.
- Blood around the mouth or nose.
- Heavier body damage.
- Character-specific injuries.

More exaggerated gore effects may also be added later, but these will be treated as a separate visual system rather than being permanently baked into every base animation.

## Where the Project Stands

Rat Fighter currently has two connected development tracks.

The Godot project is building the actual game:

- Combat.
- Match flow.
- AI.
- Training systems.
- Stages.
- Character logic.

Rat Forge is building the content pipeline:

- Character preparation.
- Sprite alignment.
- Body-part separation.
- Animation templates.
- AI-assisted generation.
- Frame editing.
- Combat data export.

Neither side is complete, but both now have working foundations.

The biggest task ahead is proving that Rat Forge can produce a complete, usable move from the canonical idle pose and export it cleanly into Godot.

The first real test will be a controlled front-hand jab.

It is a small move, but it includes most of the problems the pipeline needs to solve: character consistency, limb movement, foot locking, timing, frame cleanup and game integration.

Once one move can travel through the entire pipeline successfully, the same process can begin expanding into the rest of the character's move set.

> **Current Goal**

> Complete the full idle-to-jab-to-idle workflow in Rat Forge, export it into Godot and use it as the blueprint for every future character animation.
