import { ILog,ILogEntry } from "./interfaces";


const API_ENDPOINT = "http://localhost:5000";

export function API(append: string): string {
    return `${API_ENDPOINT}${append}`;
}

class APIServiceC {

    uploadFile(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);

            fetch(API("/upload"), {
                method: "POST",
                body: formData,
            }).then((response: Response) => {
                if (response.status !== 200) reject();
                else resolve();
            }).catch(error => {
                console.error("REST Error [/upload]");
                console.error(error);
                reject(error);
            });
        });
    }

    getLogs(severity?: string, searchTerm?: string, page: number = 1, limit: number = 10): Promise<ILogEntry[]> {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams({
                severity: severity || '',
                searchTerm: searchTerm || '',
                page: page.toString(),
                limit: limit.toString(),
            });

            fetch(API(`/logs?${params.toString()}`), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            }).then((response: Response) => {
                if (response.status !== 200) reject();
                else return response.json();
            }).then((logs:ILogEntry[]) => {
                const logsWithId = logs.map((log, index) => ({
                    ...log,
                    id: index + 1 
                    }));    
                resolve(logsWithId);
            }).catch(error => {
                console.error("REST Error [/logs]");
                console.error(error);
                reject(error);
            });
        });
    }

    getSeverities(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            fetch(API("/severities"), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            }).then((response: Response) => {
                if (response.status !== 200) reject();
                else return response.json();
            }).then((severities) => {
                resolve(severities);
            }).catch(error => {
                console.error("REST Error [/severities]");
                console.error(error);
                reject(error);
            });
        });
    }
}

export const APIService: APIServiceC = new APIServiceC()