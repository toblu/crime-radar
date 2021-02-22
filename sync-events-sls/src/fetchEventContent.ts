import fetch from 'node-fetch';
import HTMLParser from 'node-html-parser';

export const fetchEventContent = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const root = HTMLParser(html);
        const content = root.querySelector('.event-content');
        const textBody = content.querySelector('.text-body');
        return textBody.innerHTML.trim();
    } catch (e) {
        console.error('Fetching event content failed. \nFail reason:', e);
        return '';
    }
};
