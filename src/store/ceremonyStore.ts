import { create } from 'zustand';

interface CeremonyState {
  activeStep: number;
  partner1: string;
  partner2: string;
  date: string | null;
  venue: string;
  story: {
    howWeMet: string;
    proposal: string;
    whatWeLove: string;
  };
  vibe: {
    tone: string;
    rituals: string[];
  };
  generatedScript: string;
  isGenerating: boolean;

  setPartner1: (name: string) => void;
  setPartner2: (name: string) => void;
  setDate: (date: string | null) => void;
  setVenue: (venue: string) => void;
  setStoryField: (field: 'howWeMet' | 'proposal' | 'whatWeLove', value: string) => void;
  setTone: (tone: string) => void;
  toggleRitual: (ritual: string) => void;
  setGeneratedScript: (script: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  setActiveStep: (step: number) => void;
  setIsGenerating: (isGenerating: boolean) => void;
}

export const useCeremonyStore = create<CeremonyState>((set) => ({
  activeStep: 0,
  partner1: '',
  partner2: '',
  date: null,
  venue: '',
  story: {
    howWeMet: '',
    proposal: '',
    whatWeLove: '',
  },
  vibe: {
    tone: 'Romantic',
    rituals: [],
  },
  generatedScript: '',
  isGenerating: false,

  setPartner1: (name) => set({ partner1: name }),
  setPartner2: (name) => set({ partner2: name }),
  setDate: (date) => set({ date }),
  setVenue: (venue) => set({ venue }),
  setStoryField: (field, value) =>
    set((state) => ({ story: { ...state.story, [field]: value } })),
  setTone: (tone) => set((state) => ({ vibe: { ...state.vibe, tone } })),
  toggleRitual: (ritual) =>
    set((state) => {
      const rituals = state.vibe.rituals.includes(ritual)
        ? state.vibe.rituals.filter((r) => r !== ritual)
        : [...state.vibe.rituals, ritual];
      return { vibe: { ...state.vibe, rituals } };
    }),
  setGeneratedScript: (script) => set({ generatedScript: script }),
  nextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
  prevStep: () => set((state) => ({ activeStep: Math.max(0, state.activeStep - 1) })),
  setActiveStep: (step: number) => set({ activeStep: step }),
  setIsGenerating: (loading) => set({ isGenerating: loading }),
}));
