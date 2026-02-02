export interface TokenPayload {
  sub: string;     
  exp: number;     
  roles?: string[]; 
}