import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const books = [
  {
    id: 1,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    isbn: "1577314808",
    rating: 9,
    updated_at: new Date(),
    review:
      "The Power of Now is a transformative book that encourages readers to live in the present moment. Eckhart Tolle presents powerful concepts and practical advice on how to overcome the ego and embrace the 'now.' His teachings are profound yet accessible, making this book a valuable resource for anyone seeking spiritual growth and inner peace.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780060935467",
    rating: 10,
    updated_at: new Date(),
    review:
      "To Kill a Mockingbird is a timeless novel that delves into the heart of human morality and justice. Through the eyes of Scout Finch, Harper Lee explores the racial prejudices and social injustices of the American South. The characters are vividly portrayed, and the narrative is both poignant and powerful, leaving a lasting impact on readers.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    rating: 9,
    updated_at: new Date(),
    review:
      "1984 is a chilling depiction of a totalitarian regime that controls every aspect of life. George Orwell's dystopian vision is disturbingly relevant even today. The novel's exploration of themes such as surveillance, propaganda, and individualism makes it a compelling and thought-provoking read. Orwell's stark prose and gripping storyline keep readers engaged from start to finish.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    rating: 8,
    updated_at: new Date(),
    review:
      "The Great Gatsby captures the essence of the Jazz Age and the American dream. F. Scott Fitzgerald's lyrical writing brings to life the opulent world of Jay Gatsby and his unrequited love for Daisy Buchanan. The novel is a poignant exploration of wealth, ambition, and the elusive nature of happiness. Its themes are timeless, and its characters are unforgettable.",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    rating: 9,
    updated_at: new Date(),
    review:
      "Pride and Prejudice is a delightful exploration of love, class, and social expectations. Jane Austen's wit and keen observations make this novel a joy to read. The characters, especially Elizabeth Bennet and Mr. Darcy, are wonderfully complex and their evolving relationship is both entertaining and insightful. This classic romance continues to charm readers with its timeless appeal.",
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    rating: 7,
    updated_at: new Date(),
    review:
      "The Catcher in the Rye is a poignant story of teenage angst and rebellion. J.D. Salinger's protagonist, Holden Caulfield, grapples with the challenges of adolescence and the hypocrisy he perceives in the adult world. The novel's candid and introspective narrative voice makes it a compelling read, resonating deeply with those who have experienced similar struggles.",
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "9780547928227",
    rating: 9,
    updated_at: new Date(),
    review:
      "The Hobbit is a captivating tale of adventure and fantasy. J.R.R. Tolkien's richly imagined world of Middle-earth and the journey of Bilbo Baggins is a story that has delighted readers for generations. The novel's blend of whimsy, danger, and heroism creates an enchanting narrative that appeals to readers of all ages. Tolkien's masterful storytelling and intricate world-building are truly unparalleled.",
  },
  {
    id: 8,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "9781451673319",
    rating: 8,
    updated_at: new Date(),
    review:
      "Fahrenheit 451 is a thought-provoking novel about censorship and the power of literature. Ray Bradbury's dystopian world, where books are banned and 'firemen' burn them, is a chilling reminder of the dangers of suppressing knowledge and free thought. The protagonist, Guy Montag, undergoes a profound transformation as he discovers the value of books and independent thinking. Bradbury's eloquent prose and vivid imagery make this novel a compelling and important read.",
  },
  {
    id: 9,
    title: "Moby-Dick",
    author: "Herman Melville",
    isbn: "9780142437247",
    rating: 7,
    updated_at: new Date(),
    review:
      "Moby-Dick is a complex and ambitious work that explores themes of obsession, revenge, and humanity. Herman Melville's narrative follows Captain Ahab's relentless pursuit of the white whale, Moby-Dick. The novel's rich symbolism, philosophical musings, and detailed descriptions of whaling life create a dense but rewarding reading experience. It is a monumental work that offers deep insights into the human condition.",
  },
  {
    id: 10,
    title: "War and Peace",
    author: "Leo Tolstoy",
    isbn: "9780199232765",
    rating: 10,
    updated_at: new Date(),
    review:
      "War and Peace is an epic novel that intertwines historical events with the lives of several families during the Napoleonic era. Leo Tolstoy's masterful storytelling captures the complexity of human emotions and the impact of war on society. The novel's vast scope, intricate character development, and philosophical depth make it a literary masterpiece. It is a profound exploration of love, loss, and the search for meaning in a tumultuous world.",
  },
];

const notes = [
  // Notes for "The Power of Now"
  {
    id: 1,
    book_id: 1,
    notes:
      "Idea: The mind is a powerful tool that can be both a servant and a master.",
  },
  {
    id: 2,
    book_id: 1,
    notes: "Quote: 'Realize deeply that the present moment is all you have.'",
  },
  {
    id: 3,
    book_id: 1,
    notes:
      "Idea: The importance of disidentifying from the mind to find inner peace.",
  },
  {
    id: 4,
    book_id: 1,
    notes:
      "Quote: 'The primary cause of unhappiness is never the situation but your thoughts about it.'",
  },
  {
    id: 5,
    book_id: 1,
    notes:
      "Idea: Accepting the present moment as it is can lead to true happiness.",
  },
  {
    id: 6,
    book_id: 1,
    notes:
      "Quote: 'Life is now. There was never a time when your life was not now, nor will there ever be.'",
  },
  {
    id: 7,
    book_id: 1,
    notes:
      "Idea: The concept of the 'pain-body' and how it feeds on negative emotions.",
  },
  {
    id: 8,
    book_id: 1,
    notes:
      "Quote: 'To realize that you are not your thoughts is when you begin to awaken spiritually.'",
  },
  {
    id: 9,
    book_id: 1,
    notes: "Idea: The difference between clock time and psychological time.",
  },
  {
    id: 10,
    book_id: 1,
    notes:
      "Quote: 'Whatever you think the world is withholding from you, you are withholding from the world.'",
  },

  // Notes for "To Kill a Mockingbird"
  {
    id: 11,
    book_id: 2,
    notes:
      "Quote: 'You never really understand a person until you consider things from his point of view.'",
  },
  {
    id: 12,
    book_id: 2,
    notes: "Idea: The innocence of childhood and the loss of it.",
  },
  {
    id: 13,
    book_id: 2,
    notes:
      "Quote: 'People generally see what they look for, and hear what they listen for.'",
  },
  {
    id: 14,
    book_id: 2,
    notes:
      "Idea: The moral nature of human beings and the struggle between good and evil.",
  },
  {
    id: 15,
    book_id: 2,
    notes:
      "Quote: 'The one thing that doesn’t abide by majority rule is a person’s conscience.'",
  },
  {
    id: 16,
    book_id: 2,
    notes: "Idea: The impact of racism and prejudice on a community.",
  },
  {
    id: 17,
    book_id: 2,
    notes:
      "Quote: 'Mockingbirds don’t do one thing but make music for us to enjoy.'",
  },
  {
    id: 18,
    book_id: 2,
    notes: "Idea: The role of empathy in human relationships.",
  },
  {
    id: 19,
    book_id: 2,
    notes:
      "Quote: 'I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand.'",
  },
  {
    id: 20,
    book_id: 2,
    notes:
      "Idea: The importance of moral education and standing up for what is right.",
  },

  // Notes for "1984"
  {
    id: 21,
    book_id: 3,
    notes: "Quote: 'War is peace. Freedom is slavery. Ignorance is strength.'",
  },
  {
    id: 22,
    book_id: 3,
    notes:
      "Idea: The dangers of totalitarianism and oppressive government control.",
  },
  {
    id: 23,
    book_id: 3,
    notes: "Quote: 'Big Brother is watching you.'",
  },
  {
    id: 24,
    book_id: 3,
    notes: "Idea: The manipulation of truth and the rewriting of history.",
  },
  {
    id: 25,
    book_id: 3,
    notes: "Quote: 'In the face of pain there are no heroes.'",
  },
  {
    id: 26,
    book_id: 3,
    notes:
      "Idea: The role of technology in monitoring and controlling society.",
  },
  {
    id: 27,
    book_id: 3,
    notes:
      "Quote: 'Doublethink means the power of holding two contradictory beliefs in one’s mind simultaneously, and accepting both of them.'",
  },
  {
    id: 28,
    book_id: 3,
    notes:
      "Idea: The loss of individuality and personal freedom under a repressive regime.",
  },
  {
    id: 29,
    book_id: 3,
    notes:
      "Quote: 'If you want a picture of the future, imagine a boot stamping on a human face—forever.'",
  },
  {
    id: 30,
    book_id: 3,
    notes:
      "Idea: The importance of independent thought and resistance against conformity.",
  },

  // Notes for "The Great Gatsby"
  {
    id: 31,
    book_id: 4,
    notes:
      "Quote: 'So we beat on, boats against the current, borne back ceaselessly into the past.'",
  },
  {
    id: 32,
    book_id: 4,
    notes:
      "Idea: The American dream and its corruption by wealth and materialism.",
  },
  {
    id: 33,
    book_id: 4,
    notes:
      "Quote: 'Gatsby believed in the green light, the orgastic future that year by year recedes before us.'",
  },
  {
    id: 34,
    book_id: 4,
    notes:
      "Idea: The hollowness of the upper class and the superficiality of social interactions.",
  },
  {
    id: 35,
    book_id: 4,
    notes:
      "Quote: 'I hope she’ll be a fool—that’s the best thing a girl can be in this world, a beautiful little fool.'",
  },
  {
    id: 36,
    book_id: 4,
    notes:
      "Idea: The impact of the past on the present and the impossibility of recapturing it.",
  },
  {
    id: 37,
    book_id: 4,
    notes:
      "Quote: 'They’re a rotten crowd. You’re worth the whole damn bunch put together.'",
  },
  {
    id: 38,
    book_id: 4,
    notes: "Idea: The pursuit of love and the idealization of the past.",
  },
  {
    id: 39,
    book_id: 4,
    notes:
      "Quote: 'There are only the pursued, the pursuing, the busy, and the tired.'",
  },
  {
    id: 40,
    book_id: 4,
    notes:
      "Idea: The emptiness and moral decay behind the facade of glamour and excess.",
  },

  // Notes for "Pride and Prejudice"
  {
    id: 41,
    book_id: 5,
    notes:
      "Quote: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.'",
  },
  {
    id: 42,
    book_id: 5,
    notes: "Idea: The social expectations and pressures surrounding marriage.",
  },
  {
    id: 43,
    book_id: 5,
    notes:
      "Quote: 'I could easily forgive his pride, if he had not mortified mine.'",
  },
  {
    id: 44,
    book_id: 5,
    notes:
      "Idea: The importance of first impressions and their potential to be misleading.",
  },
  {
    id: 45,
    book_id: 5,
    notes: "Quote: 'Till this moment I never knew myself.'",
  },
  {
    id: 46,
    book_id: 5,
    notes:
      "Idea: The development of mutual respect and understanding in relationships.",
  },
  {
    id: 47,
    book_id: 5,
    notes: "Quote: 'You have bewitched me, body and soul.'",
  },
  {
    id: 48,
    book_id: 5,
    notes:
      "Idea: The role of social class and economic stability in romantic decisions.",
  },
  {
    id: 49,
    book_id: 5,
    notes:
      "Quote: 'Vanity and pride are different things, though the words are often used synonymously.'",
  },
  {
    id: 50,
    book_id: 5,
    notes:
      "Idea: The transformation of characters through personal growth and self-awareness.",
  },
  // Notes for "The Catcher in the Rye"
  {
    id: 51,
    book_id: 6,
    notes:
      "Quote: 'The mark of the immature man is that he wants to die nobly for a cause, while the mark of the mature man is that he wants to live humbly for one.'",
  },
  {
    id: 52,
    book_id: 6,
    notes: "Idea: Holden's struggle with the phoniness of the adult world.",
  },
  {
    id: 53,
    book_id: 6,
    notes:
      "Quote: 'Don't ever tell anybody anything. If you do, you start missing everybody.'",
  },
  {
    id: 54,
    book_id: 6,
    notes: "Idea: The theme of isolation and the fear of intimacy.",
  },
  {
    id: 55,
    book_id: 6,
    notes: "Quote: 'People always clap for the wrong things.'",
  },
  {
    id: 56,
    book_id: 6,
    notes: "Idea: The innocence of childhood and the desire to protect it.",
  },
  {
    id: 57,
    book_id: 6,
    notes:
      "Quote: 'The best thing, though, in that museum was that everything always stayed right where it was.'",
  },
  {
    id: 58,
    book_id: 6,
    notes:
      "Idea: The significance of the red hunting hat as a symbol of individuality.",
  },
  {
    id: 59,
    book_id: 6,
    notes:
      "Quote: 'What I have to do, I have to catch everybody if they start to go over the cliff.'",
  },
  {
    id: 60,
    book_id: 6,
    notes:
      "Idea: Holden's unrealistic fantasy of being the 'catcher in the rye' and its implications.",
  },

  // Notes for "The Hobbit"
  {
    id: 61,
    book_id: 7,
    notes: "Quote: 'In a hole in the ground there lived a hobbit.'",
  },
  {
    id: 62,
    book_id: 7,
    notes:
      "Idea: Bilbo's transformation from a timid hobbit to a brave adventurer.",
  },
  {
    id: 63,
    book_id: 7,
    notes:
      "Quote: 'There is more in you of good than you know, child of the kindly West.'",
  },
  {
    id: 64,
    book_id: 7,
    notes: "Idea: The theme of heroism and personal growth through adversity.",
  },
  {
    id: 65,
    book_id: 7,
    notes:
      "Quote: 'So comes snow after fire, and even dragons have their endings.'",
  },
  {
    id: 66,
    book_id: 7,
    notes:
      "Idea: The importance of friendship and loyalty in the face of danger.",
  },
  {
    id: 67,
    book_id: 7,
    notes:
      "Quote: 'It does not do to leave a live dragon out of your calculations, if you live near him.'",
  },
  {
    id: 68,
    book_id: 7,
    notes:
      "Idea: The significance of the journey motif and its transformative power.",
  },
  {
    id: 69,
    book_id: 7,
    notes:
      "Quote: 'If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.'",
  },
  {
    id: 70,
    book_id: 7,
    notes:
      "Idea: The critique of greed and the corrupting influence of treasure.",
  },

  // Notes for "Fahrenheit 451"
  {
    id: 71,
    book_id: 8,
    notes: "Quote: 'It was a pleasure to burn.'",
  },
  {
    id: 72,
    book_id: 8,
    notes:
      "Idea: The role of censorship and the suppression of dissenting ideas.",
  },
  {
    id: 73,
    book_id: 8,
    notes:
      "Quote: 'There must be something in books, things we can’t imagine, to make a woman stay in a burning house; there must be something there. You don’t stay for nothing.'",
  },
  {
    id: 74,
    book_id: 8,
    notes: "Idea: The dehumanizing effects of technology and mass media.",
  },
  {
    id: 75,
    book_id: 8,
    notes:
      "Quote: 'We need not to be let alone. We need to be really bothered once in a while. How long is it since you were really bothered? About something important, about something real?'",
  },
  {
    id: 76,
    book_id: 8,
    notes:
      "Idea: The rediscovery of literature and critical thinking as a means of personal and societal redemption.",
  },
  {
    id: 77,
    book_id: 8,
    notes:
      "Quote: 'There is more than one way to burn a book. And the world is full of people running about with lit matches.'",
  },
  {
    id: 78,
    book_id: 8,
    notes:
      "Idea: The importance of memory and history in preserving human culture.",
  },
  {
    id: 79,
    book_id: 8,
    notes:
      "Quote: 'Stuff your eyes with wonder, live as if you’d drop dead in ten seconds. See the world. It’s more fantastic than any dream made or paid for in factories.'",
  },
  {
    id: 80,
    book_id: 8,
    notes:
      "Idea: Montag's journey from ignorance to enlightenment and the role of mentors in this transformation.",
  },

  // Notes for "Moby-Dick"
  {
    id: 81,
    book_id: 9,
    notes: "Quote: 'Call me Ishmael.'",
  },
  {
    id: 82,
    book_id: 9,
    notes: "Idea: The obsession and monomania of Captain Ahab.",
  },
  {
    id: 83,
    book_id: 9,
    notes:
      "Quote: 'From hell’s heart I stab at thee; for hate’s sake I spit my last breath at thee.'",
  },
  {
    id: 84,
    book_id: 9,
    notes:
      "Idea: The symbolism of the white whale and its multiple interpretations.",
  },
  {
    id: 85,
    book_id: 9,
    notes:
      "Quote: 'I know not all that may be coming, but be it what it will, I’ll go to it laughing.'",
  },
  {
    id: 86,
    book_id: 9,
    notes: "Idea: The interplay between fate and free will in the narrative.",
  },
  {
    id: 87,
    book_id: 9,
    notes: "Quote: 'It is not down on any map; true places never are.'",
  },
  {
    id: 88,
    book_id: 9,
    notes:
      "Idea: The existential and philosophical questions raised by the novel.",
  },
  {
    id: 89,
    book_id: 9,
    notes:
      "Quote: 'The sea had jeeringly kept his finite body up, but drowned the infinite of his soul.'",
  },
  {
    id: 90,
    book_id: 9,
    notes: "Idea: The theme of revenge and its consuming nature.",
  },

  // Notes for "War and Peace"
  {
    id: 91,
    book_id: 10,
    notes:
      "Quote: 'We can know only that we know nothing. And that is the highest degree of human wisdom.'",
  },
  {
    id: 92,
    book_id: 10,
    notes: "Idea: The impact of historical events on personal lives.",
  },
  {
    id: 93,
    book_id: 10,
    notes:
      "Quote: 'The strongest of all warriors are these two — Time and Patience.'",
  },
  {
    id: 94,
    book_id: 10,
    notes:
      "Idea: The philosophical exploration of free will versus determinism.",
  },
  {
    id: 95,
    book_id: 10,
    notes:
      "Quote: 'If everyone fought for their own convictions there would be no war.'",
  },
  {
    id: 96,
    book_id: 10,
    notes: "Idea: The complexity of human nature and moral ambiguity.",
  },
  {
    id: 97,
    book_id: 10,
    notes:
      "Quote: 'The whole world is divided for me into two parts: one is she, and there is all happiness, hope, light; the other is where she is not, and there is dejection and darkness.'",
  },
  {
    id: 98,
    book_id: 10,
    notes: "Idea: The search for meaning and spiritual fulfillment in life.",
  },
  {
    id: 99,
    book_id: 10,
    notes: "Quote: 'Everything I know, I know because of love.'",
  },
  {
    id: 100,
    book_id: 10,
    notes:
      "Idea: The interweaving of personal narratives with grand historical events.",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { books: books });
});

app.get("/:notes_link", async (req, res) => {
  const notes_link = req.params.notes_link;
  const book = books.find(
    (book) => book.title.replace(/[^a-zA-Z0-9]+/g, "") === notes_link
  );
  const book_notes = notes.filter((note) => note.book_id === book.id);
  res.render("book.ejs", {
    book: book,
    notes: book_notes,
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
