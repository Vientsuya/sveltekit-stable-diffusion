import { writable, type Writable } from 'svelte/store';
import type { generatedImage } from '../ambient';

export const imageModal: Writable<generatedImage | null> = writable(null);
