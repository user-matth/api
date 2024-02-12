export class ApiResponse<T = any> {
    constructor(public status: 'success' | 'error', public message: string, public data?: T) { }
}