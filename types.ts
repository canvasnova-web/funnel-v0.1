export interface AnalysisResult {
    size: string;
    width: number;
    height: number;
    material: string;
    frame: string;
    distance: string;
    lux: string;
}

export interface TimelineStepProps {
    step: {
        title: string;
        desc: string;
        icon: any;
        image?: string;
    };
    index: number;
    isLast: boolean;
}

export type Lang = 'de' | 'en';
