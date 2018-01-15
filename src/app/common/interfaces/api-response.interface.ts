export interface ApiResponse<T> {
    status: 'success';
    data: T;
}