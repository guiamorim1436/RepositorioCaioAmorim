export interface FrameManifest {
  totalFrames: number;
  format: string;
  width: number;
  height: number;
  frames: string[];
}

export interface ScrollState {
  currentFrame: number;
  progress: number;
  isLoaded: boolean;
  loadedCount: number;
  totalFrames: number;
}
