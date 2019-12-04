export interface PlaceDto {
  description: string;
  id: string;
  matched_substrings: { length: number; offset: number }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: [
      {
        offset: number;
        length: number;
      },
    ];
  };
  terms: { offset: number; value: string }[];
  types: string[];
}
