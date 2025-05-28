export interface INotice {
  "@id": string;
  "@type": string;
  id: number;
  title: string;
  status: string;
  createdAt: string;
}
export interface IHydra {
  "@id": string;
  "@type": string;
  "hydra:first": string;
  "hydra:last": string;
  "hydra:next"?: string;
  "hydra:previous"?: string;
}
export interface INoticeTotal {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": INotice[];
  "hydra:totalItems": number;
  "hydra:view": IHydra;
}
