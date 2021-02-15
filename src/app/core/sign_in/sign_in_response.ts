export interface SignInResponse {
    isSuccess: boolean;
    id: string;
    tenantId: string;
    roles: string;
    level: number;
    name: string;
}