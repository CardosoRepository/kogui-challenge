import { Character } from "./character.model";
import { Location } from "./location.model";
import { Episode } from "./episode.model";

export interface ApiResponse {
	info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[] | Location[] | Episode[];
}
