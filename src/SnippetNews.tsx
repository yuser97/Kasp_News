import React from 'react';
import Tooltip from 'antd/es/tooltip';
import Button from 'antd/es/button';
import { ShareAltOutlined, SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { GlobalOutlined, FlagOutlined, ReadOutlined } from '@ant-design/icons';
import Card from 'antd/es/card';
import Tag from 'antd/es/tag';
import dayjs from 'dayjs';
import './SnippetNews.scss';

export interface IData_TagItem {
    value: string;
    count: number;
}

export interface IData_TrafficItem {
    value: string;
    count: number;
}

export interface IData_SnippetNews {
    ID: number;
    TI: string;
    AB: string;
    URL: string;
    DOM: string;
    DP: string;
    LANG: string;
    REACH: number;
    KW: IData_TagItem[];
    AU: string[];
    CNTR: string;
    CNTR_CODE: string;
    SENT: string;
    TRAFFIC: IData_TrafficItem[];
    FAV: string;
    HIGHLIGHTS: string[];
    DUPLICATES?: number;
}

export interface NewsSnippetProps {
    data: IData_SnippetNews;
    showDuplicates?: boolean;
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data, showDuplicates = false }) => {
    const {
        TI,
        AB,
        URL,
        DOM,
        DP,
        LANG,
        REACH,
        KW,
        AU,
        CNTR,
        CNTR_CODE,
        SENT,
        TRAFFIC,
        FAV,
        HIGHLIGHTS,
        DUPLICATES
    } = data;

    const formattedDate = dayjs(DP).format('DD MMM YYYY').toUpperCase();
    const reachFormatted = REACH >= 1000 ? `${(REACH / 1000).toFixed(0)}K` : REACH;

    const renderHighlightedText = (text: string) => {
        return text.replace(/<kw>(.*?)<\/kw>/g, '<span class="highlight">$1</span>');
    };

    return (
        <div className="news-container">
            <Card className="news-snippet" hoverable>
                {/* Header with meta info */}
                <div className="news-meta-header">
                    <div className="meta-left">
                        <span className="date">{formattedDate}</span>
                        <span className="reach">{reachFormatted} Reach</span>
                        <div className="traffic-countries">
                            Top traffic:
                            {TRAFFIC.slice(0, 3).map((item, index) => (
                                <span key={index} className="country-traffic">
                                    {item.value} {Math.round(item.count * 100)}%
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="meta-right">
                        <Tag className={`sentiment-tag ${SENT.toLowerCase()}`}>
                            {SENT}
                        </Tag>
                        <Button type="text" icon={<ShareAltOutlined />} className="action-btn"></Button>
                        <Button type="text" icon={<SaveOutlined />} className="action-btn"></Button>
                    </div>
                </div>

                {/* Main content */}
                <div className="news-content">
                    <h2 className="news-title">
                        <a href={URL} target="_blank" rel="noopener noreferrer">
                            {TI}
                        </a>
                    </h2>

                    <div className="news-source-info">
                     
                        <span className="source" >
                        <GlobalOutlined style={{color: 'white'}} />{DOM}
                        </span>
                        <span className="country">
                            <img
                                src={`https://flagcdn.com/16x12/${CNTR_CODE.toLowerCase()}.png`}
                                alt={CNTR}
                                style={{ width: 16, marginRight: 4 }}
                            />
                            {CNTR}
                        </span>
                        <span className="language">
                            <ReadOutlined style={{ marginRight: 4 }} /> {LANG.toUpperCase()}
                        </span>
                    </div>

                    <div className="news-text">
                        {HIGHLIGHTS?.length > 0 ? (
                            HIGHLIGHTS.map((text, i) => (
                                <p
                                    key={i}
                                    dangerouslySetInnerHTML={{ __html: renderHighlightedText(text) }}
                                />
                            ))
                        ) : (
                            <p>{AB}</p>
                        )}
                    </div>
                </div>

                {/* Keywords section */}
                <div className="keywords-section">
                    <div className="keywords-list">
                        {KW.slice(0, 3).map((tag, i) => (
                            <Tag key={i} className="keyword-tag">
                                {tag.value} ({tag.count})
                            </Tag>
                        ))}
                        {KW.length > 3 && (
                            <Button type="link" className="show-more-btn">
                                Show All +{KW.length - 3}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="news-footer">
                <Button href={URL} target="_blank" rel="noopener noreferrer" className="original-link">
                        Original Source
                </Button>
                </div>
            </Card>
        </div>
    );
};

export default NewsSnippet;