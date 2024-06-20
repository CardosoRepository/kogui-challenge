import { Character } from "./character.model";

export interface ApiResponse {
	info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: Character[];
}
