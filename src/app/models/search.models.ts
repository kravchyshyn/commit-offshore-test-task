export const RESULTS_LIMIT = 30;
export const MIN_QUERY_LENGTH = 2;
export interface ICityData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

export interface ISearchState {
  pastQueries: string[];
  results: IBookData[];
  error?: string;
  allItemsLoaded?: boolean;
  isLoading: boolean;
}

export interface IBookDataResponse {
  kind: string;
  totalItems: number;
  items: IBookData[];
}

export interface IBookData {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: IVolumeInfo;
  saleInfo: ISaleInfo;
  accessInfo: IAccessInfo;
  searchInfo: ISearchInfo;
}

export interface IIdentifier {
  type: string;
  identifier: string;
}

export interface IVolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IIdentifier[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

export interface ISaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface IAccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
  };
  pdf: {
    isAvailable: boolean;
  };
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface ISearchInfo {
  textSnippet: string;
}
