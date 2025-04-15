export interface Game {
  id: number;
  title: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  releaseDate: string;
  developer: string;
  publisher: string;
}

export const games: Game[] = [
  {
    id: 1,
    title: "Call of Duty: Black Ops 6",
    price: 69.99,
    image: "https://i.blogs.es/027089/black-ops-6/1200_800.webp",
    category: "FPS",
    rating: 4.8,
    description: "La última entrega de la icónica serie Black Ops lleva la guerra moderna a un nuevo nivel.",
    releaseDate: "2024",
    developer: "Treyarch",
    publisher: "Activision"
  },
  {
    id: 2,
    title: "Red Dead Redemption 2",
    price: 59.99,
    salePrice: 39.99,
    image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2018/10/red-dead-redemption-2_22.jpg?tf=1200x",
    category: "Acción/Aventura",
    rating: 4.9,
    description: "Una épica historia del Salvaje Oeste americano.",
    releaseDate: "2018",
    developer: "Rockstar Games",
    publisher: "Rockstar Games"
  },
  {
    id: 3,
    title: "Grand Theft Auto V",
    price: 49.99,
    salePrice: 24.99,
    image: "https://play-reactor.com/wp-content/uploads/2013/04/grand_theft_auto_v_1.jpg?w=470&h=578",
    category: "Acción",
    rating: 4.9,
    description: "Explora Los Santos y sus alrededores en esta obra maestra del mundo abierto.",
    releaseDate: "2013",
    developer: "Rockstar North",
    publisher: "Rockstar Games"
  },
  {
    id: 4,
    title: "FIFA 25",
    price: 69.99,
    image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2024/07/ea-sports-fc-25-3734750.jpg?tf=1200x",
    category: "Deportes",
    rating: 4.7,
    description: "El simulador de fútbol más realista hasta la fecha.",
    releaseDate: "2023",
    developer: "EA Sports",
    publisher: "Electronic Arts"
  },
  {
    id: 5,
    title: "Cyberpunk 2077",
    price: 59.99,
    salePrice: 29.99,
    image: "https://cdn.forbes.com.mx/2023/08/Cyberpunk-2077-640x360.webp",
    category: "RPG",
    rating: 4.6,
    description: "Sumérgete en Night City, una megalópolis obsesionada con el poder y la modificación corporal.",
    releaseDate: "2020",
    developer: "CD Projekt Red",
    publisher: "CD Projekt"
  },
  {
    id: 6,
    title: "The Last of Us Part II",
    price: 49.99,
    image: "https://www.infobae.com/resizer/v2/5GYJ5GJUXNBO5D2Z5JZOCLCK6U.jpg?auth=f8d9087ae42a3770e74296c8cd9c35c941e38c915bff88a93d7a627f765496f4&smart=true&width=350&height=197&quality=85",
    category: "Acción/Aventura",
    rating: 4.8,
    description: "Una intensa historia de venganza y redención.",
    releaseDate: "2020",
    developer: "Naughty Dog",
    publisher: "Sony Interactive Entertainment"
  },
  {
    id: 7,
    title: "Elden Ring",
    price: 59.99,
    image: "https://elaltavoz.mx/wp-content/uploads/2024/03/dl3d5ccidn9wlkemhfjr.jpg",
    category: "RPG",
    rating: 4.9,
    description: "Explora un vasto mundo lleno de misterios y desafíos.",
    releaseDate: "2022",
    developer: "FromSoftware",
    publisher: "Bandai Namco"
  },
  {
    id: 8,
    title: "Assassin's Creed Valhalla",
    price: 59.99,
    salePrice: 19.99,
    image: "https://imgmedia.larepublica.pe/640x371/larepublica/original/2022/01/14/61e1cdc8f4cb332c1374e01a.webp",
    category: "Acción/RPG",
    rating: 4.7,
    description: "Vive la saga vikinga definitiva.",
    releaseDate: "2020",
    developer: "Ubisoft",
    publisher: "Ubisoft"
  },
  {
    id: 9,
    title: "Resident Evil 4 Remake",
    price: 59.99,
    image: "https://www.lavanguardia.com/files/content_image_desktop_filter/uploads/2022/06/03/62993e2303a2c.jpeg",
    category: "Terror/Acción",
    rating: 4.9,
    description: "El clásico survival horror reinventado para una nueva generación.",
    releaseDate: "2023",
    developer: "Capcom",
    publisher: "Capcom"
  },
  {
    id: 10,
    title: "God of War Ragnarök",
    price: 69.99,
    salePrice: 49.99,
    image: "https://phantom-marca.unidadeditorial.es/bb7b198a80f3cf58aa3686542587b8ec/resize/660/f/webp/assets/multimedia/imagenes/2024/09/20/17268240316467.jpg",
    category: "Acción/Aventura",
    rating: 4.9,
    description: "Continúa la épica saga nórdica de Kratos y Atreus.",
    releaseDate: "2022",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment"
  }
];