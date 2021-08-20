/** The main entry type. */
export interface Entry {
  authors: string[];
  date: string;
  type: string;
  abstract?: string;
  comment?: string;
  doi?: string;
  id?: string;
  issue?: number;
  ISBN?: string;
  journal?: string;
  journalRef?: string;
  location?: string;
  mainTitle?: string;
  number?: string;
  pageTotal?: string;
  pdfLink?: string;
  primaryCategory?: string;
  publisher?: string;
  pubstate?: string;
  series?: string;
  subTitle?: string;
  title?: string;
  version?: number;
  volume?: number;
}

/** An arXiv query as built by SearchForm */
export interface Query {
  authors: string[];
  ids: string[];
  titles: string[];
}

/** Search settings */
export interface SearchSettings {
  maxResults: number;
  sortBy: "submittedDate" | "lastUpdatedDate" | "relevance";
  sortOrder: "ascending" | "descending";
}

/** The settings */
export type Settings = SearchSettings & {
  fileFolder: string;
  filePrefix: boolean;
  includeAbstract: boolean;
  includeFile: boolean;
  includePrimaryCategory: boolean;
  includeVersion: boolean;
  includeWget: boolean;
  wgetPowershell: boolean;
  mode: "bibtex" | "biblatex";
};
