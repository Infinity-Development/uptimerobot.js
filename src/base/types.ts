export interface Options {
    api_key: string,
    format?: 'json' | 'xml',
}

export interface _reqLogic {
    method: string,
    reqdata: {
        queryParams?: any,
        headers: any,
        data?: any,
    }
}

export interface getMonitors {
    monitors: Monitor[];
}

/**
 * Get a monitor
 * @param api_key - Your UptimeRobot API key
 * @param custom_uptime_ratios - Custom uptime ratios
 * @param custom_down_durations - Custom down durations
 * @param custom_uptime_ranges - Custom uptime ranges
 * @param all_time_uptime_ratio - All time uptime ratio
 * @param all_time_uptime_durations - All time uptime durations
 * @param offset - The pagination offset (default: 0)
 * @param limit - The pagination limit (default: 50)
 * @param search - The search query (can be a url or friendly name)
 */
export interface getMonitorsOpts {
    response_times?: string;
    custom_uptime_ratios?: string;
    custom_down_durations?: string;
    custom_uptime_ranges?: string;
    all_time_uptime_ratio?: string;
    all_time_uptime_durations?: string;
    offset?: string;
    limit?: string;
    search?: string;
}

export interface Monitor {
    id: number;
    friendly_name: string;
    url: string;
    type: number;
    sub_type: string;
    keyword_type: string;
    keyword_case_type: string;
    keyword_value: string;
    http_username: string;
    http_password: string;
    port: string;
    interval: number;
    status: number;
    create_datetime: number;
    monitor_group: number;
    is_group_main: number;
    logs: Log[];
}

export interface Log {
    type: number;
    datetime: number;
    duration: number;
    details: string;
}