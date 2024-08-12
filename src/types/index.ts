export type NavItemsType = {
  title: string
  icon: string
  route: string
}

export type MoviesType = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

type genres = {
  id: number
  name: string
}

type ProductionCompanies = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}
type ProductionCountries = {
  iso_3166_1: string
  name: string
}
type SpokenLanguages = {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieType = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: genres[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompanies[]
  production_countries: ProductionCountries[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type DatasType = {
  page: number
  results: MoviesType[]
  total_pages: number
  total_results: number
}

export type CastType = {
  adult: boolean
  gender: number
  id: 6193
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type CastResultsType = {
  id: 27205
  cast: CastType[]
}
export type VideosType = {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export type VideosResultsType = {
  id: number
  results: VideosType[]
}

type MediaType = {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export type MediaResultsType = {
  backdrops: MediaType[]
  id: number
  logos: MediaType[]
  posters: MediaType[]
}

type AuthorDetailsType = {
  avatar_path: string
  name: string
  rating: string | number
  username: string
}

export type ReviewsType = {
  author: string
  author_details: AuthorDetailsType
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

export type ReviewsResultsType = {
  id: number
  page: 1
  results: ReviewsType[]
  total_pages: number
  total_results: number
}

export type GenresType = {
  id: number
  name: string
}
