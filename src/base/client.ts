import { Options, _reqLogic, getMonitors, getMonitorsOpts } from "./types";
import { EventEmitter } from "events";
import axios from "axios";

export class URClient extends EventEmitter {
    private _url: string;
    private api_key: string;
    private validFormats = new Set(['json', 'xml']);

    constructor(opts: Options) {
        super();

        this._handleOpts(opts);

        this._url = "https://api.uptimerobot.com/v2";
        this.api_key = opts.api_key;
    }

    private async _request(opts: _reqLogic) {
        let url = `${this._url}/${opts.method}`;
    
        if (opts.reqdata.queryParams) {
            const searchParams = new URLSearchParams(opts.reqdata.queryParams).toString();
            url += `?${searchParams}`;
        }
    
        try {
            const response = await axios.post(url, opts.reqdata.data ? {
                headers: opts.reqdata.headers,
                data: opts.reqdata.data,
            } : {
                headers: opts.reqdata.headers,
            });
    
            if (response?.data.stat === "fail") {
                this.emitError(response?.data.error.message);
            }
    
            return response?.data;
        } catch (err) {
            if (err instanceof Error) {
                this.emit("error", err.message);
                this.emitError(err.message)
            }
        }
    }

    private emitMethod(method: string, message: string): void {
        this.emit(method, message);
    }

    private emitError(message: string): void {
        this.emit("error", message);
    }

    private validApiKey(apiKey: string): boolean {
        if (!apiKey) return false;
        if (!apiKey.startsWith("ur")) return false;
        return true;
    }

    private _handleOpts(opts: Options) {
        if (!opts || typeof opts !== "object") {
            this.emitError("Options should be a valid object");
            return;
        }

        if (!opts.api_key || typeof opts.api_key !== "string") {
            this.emitError("Please provide a valid API key");
            return;
        }

        if (!this.validApiKey(opts.api_key)) {
            this.emitError("Please provide a valid read-only API key");
            return;
        }

        if (opts.format) {

            if (typeof opts.format !== "string") {
                this.emitError("Please provide a valid format (json or xml)");
                return;
            }

            if (!this.validFormats.has(opts.format)) {
                this.emitError("Please provide a valid format (json or xml)");
                return;
            }
        }
    }

    /**
     * Get all monitors.
     * @param opts The options to pass
     * @param opts.response_times - The response times
     * @param opts.custom_uptime_ratios - The custom uptime ratios
     * @param opts.custom_down_durations - The custom down durations
     * @param opts.custom_uptime_ranges - The custom uptime ranges
     * @param opts.all_time_uptime_ratio - The all time uptime ratio
     * @param opts.all_time_uptime_durations - The all time uptime durations
     * @param opts.offset - The pagination offset (default: 0)
     * @param opts.limit - The pagination limit (default: 50)
     * @param opts.search - The search query (can be a url or friendly name)
     * @returns The monitors
     */
    public async getMonitors(opts: getMonitorsOpts = {}): Promise<getMonitors> {
        const res = await this._request({
            method: "getMonitors",
            reqdata: {
                queryParams: {
                    api_key: this.api_key,
                    ...opts,
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Access-Control-Allow-Origin": "*"
                },
            }
        });

        this.emitMethod("getMonitors", res.monitors);

        return res.monitors;
    }
}