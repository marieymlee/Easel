export interface Painting {
  id: number;
  title: string;
  artist: string;
  year: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  meaning: string;
}

export const paintings: Painting[] = [
  {
    id: 1,
    title: "The Bedroom",
    artist: "Vincent van Gogh",
    year: "1889",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/28560",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/960px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
    meaning:
      'Painted while Van Gogh was staying in Arles, this is his own bedroom rendered in flattened, clashing colors he said were meant to express "rest" and "sleep." He was so attached to the image that he painted three versions after the first was damaged by flooding.',
  },
  {
    id: 2,
    title: "Self-Portrait with a Straw Hat",
    artist: "Vincent van Gogh",
    year: "1887",
    source: "The Metropolitan Museum of Art",
    sourceUrl: "https://www.metmuseum.org/art/collection/search/436532",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg",
    meaning:
      "One of more than 35 self-portraits Van Gogh painted, largely because he couldn't afford to pay models. This one applies the short, directional brushwork he was developing from Pointillism to his own face instead of a landscape.",
  },
  {
    id: 3,
    title: "Water Lilies",
    artist: "Claude Monet",
    year: "1906",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/16568",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Claude_Monet_-_Water_Lilies_-_1933.1157_-_Art_Institute_of_Chicago.jpg/960px-Claude_Monet_-_Water_Lilies_-_1933.1157_-_Art_Institute_of_Chicago.jpg",
    meaning:
      "Part of a series of roughly 250 water lily paintings Monet made in the garden he built at his home in Giverny, obsessively returning to the same pond as the light changed. There's no horizon and no sky, just water, reflection, and flowers.",
  },
  {
    id: 4,
    title: "Stacks of Wheat (End of Summer)",
    artist: "Claude Monet",
    year: "1890-91",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/64818",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Claude_Monet_-_Stacks_of_Wheat_%28End_of_Summer%29_-_1985.1103_-_Art_Institute_of_Chicago.jpg/960px-Claude_Monet_-_Stacks_of_Wheat_%28End_of_Summer%29_-_1985.1103_-_Art_Institute_of_Chicago.jpg",
    meaning:
      "One of roughly 25 paintings Monet made of the same two wheatstacks near his house, at different times of day and in different seasons, to study how light alone changes a scene. It's less about the wheat than about proving the subject barely matters.",
  },
  {
    id: 5,
    title: "Under the Wave off Kanagawa (The Great Wave)",
    artist: "Katsushika Hokusai",
    year: "ca. 1830-32",
    source: "The Metropolitan Museum of Art",
    sourceUrl: "https://www.metmuseum.org/art/collection/search/45434",
    imageUrl: "https://images.metmuseum.org/CRDImages/as/original/DP130155.jpg",
    meaning:
      "A woodblock print, not a painting, from a series called Thirty-Six Views of Mount Fuji, though Fuji is the small peak in the background, dwarfed by the wave. It was mass-produced and cheap in its own time, closer to a poster than a museum piece.",
  },
  {
    id: 6,
    title: "Paris Street; Rainy Day",
    artist: "Gustave Caillebotte",
    year: "1877",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/20684",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Gustave_Caillebotte_-_Paris_Street%2C_Rainy_Day_-_1964.336_-_Art_Institute_of_Chicago.jpg/960px-Gustave_Caillebotte_-_Paris_Street%2C_Rainy_Day_-_1964.336_-_Art_Institute_of_Chicago.jpg",
    meaning:
      "Caillebotte used photographic framing and cropped figures years before photography's influence on painting was common, part of why the piece feels almost like a snapshot. He funded and organized several Impressionist exhibitions himself but has historically gotten less credit than the artists he supported.",
  },
  {
    id: 7,
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893/95",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/17229",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Munch_The_Scream_lithography.png",
    meaning:
      'Munch made several versions of this image; this one is a 1895 lithograph, a black-and-white print pulled from a drawing on stone, rather than one of his famous painted versions. He described the inspiration as a real moment walking at sunset when he felt "a great scream through nature," and the wavy sky and bridge are meant to depict that anxiety physically, not a literal landscape.',
  },
  {
    id: 8,
    title: "Study of a Young Woman",
    artist: "Johannes Vermeer",
    year: "ca. 1665-67",
    source: "The Metropolitan Museum of Art",
    sourceUrl: "https://www.metmuseum.org/art/collection/search/437879",
    imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DP353256.jpg",
    meaning:
      "One of Vermeer's small handful of surviving \"tronies,\" head studies of an imagined figure rather than a formal portrait of a real sitter, in the same tradition as his better-known Girl with a Pearl Earring. Only about 34 Vermeer paintings are known to exist today.",
  },
  {
    id: 9,
    title: "A Sunday on La Grande Jatte — 1884",
    artist: "Georges Seurat",
    year: "1884",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/27992",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg/960px-Georges_Seurat_-_A_Sunday_on_La_Grande_Jatte_--_1884_-_Google_Art_Project.jpg",
    meaning:
      "Made entirely from tiny dots of pure color instead of blended brushstrokes, a technique Seurat called Divisionism, better known today as Pointillism, relying on the viewer's eye to blend the color rather than the paint itself. It took him about two years and dozens of studies to complete.",
  },
  {
    id: 10,
    title: "Improvisation No. 30 (Cannons)",
    artist: "Wassily Kandinsky",
    year: "1913",
    source: "Art Institute of Chicago",
    sourceUrl: "https://www.artic.edu/artworks/8991",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Vasily_Kandinsky%2C_Improvisation_No._30_%28Cannons%29%2C_1913%2C_1931.511%2C_Art_Institute_of_Chicago.jpg/960px-Vasily_Kandinsky%2C_Improvisation_No._30_%28Cannons%29%2C_1913%2C_1931.511%2C_Art_Institute_of_Chicago.jpg",
    meaning:
      "Kandinsky is generally credited as one of the first painters to move fully into abstraction, and this piece straddles that line: cannons and a toppling building are still faintly visible under the color and gesture. He believed color and form could function like music, producing emotion directly without depicting anything real.",
  },
];
