import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

/**
 * MY PLAN
 *
 * Goals
 *
 *  - Improve the landing page, make it farrrr more user friendly. That means don't force people to log in immedaitely and instead introduce the game and what it is. Give examples, screenshots
 * and generally make this as approachable as it possibly can be
 *
 * - Add mixed games, whereby you can host games with a mix of questions from both the standard library and other libraries
 *
 * - Improve account features, present an area to change the user's profile picture and don't forget to log the user out when they update their profile picture.
 *
 * - Record user scores and top answers. Create a leaderboard
 *
 * - Create a game over screen that occurs when the round has reached the maximum number of rounds. Offer a questions in review stage for this where the users can look back over all answers
 *
 * - Come up with a better name
 *
 * - Create pages for the privacy policy and maybe add a footer to the application as well.
 *
 * - Track which collections people have written to and let them view their submissions
 *
 * - Add a question index owner to customQuestion collections and let the owner manage the entire collection
 */
