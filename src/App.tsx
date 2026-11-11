import React, { useState, useEffect } from 'react';
import { Menu, Plus, Star } from 'lucide-react';
import './App.css';

// 定义数据类型接口
interface GalleryItem {
  title: string;
  uploader: string;
  thumb: string;
  date: string;
  lang: string;
  tag: string;
  rating: number;
}

const App: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    const targetUrl = 'http://ex.moonchan.xyz';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

    try {
      const response = await fetch(proxyUrl);
      const data = await response.json();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');

      // 针对目标站点的解析逻辑
      const rows = doc.querySelectorAll('.itg tr, .itg .gl1c');
      
      const parsedData: GalleryItem[] = Array.from(rows).map((row: any) => ({
        title: row.querySelector('.glink')?.innerText || "Loading...",
        uploader: row.querySelector('.gl4c')?.innerText || "uploader",
        thumb: row.querySelector('img')?.src || "",
        date: row.querySelector('.gl2c')?.innerText || "2021-02-04 11:46",
        lang: "ZH",
        tag: "NON-H",
        rating: 4.5
      })).filter(item => item.title !== "Loading...");

      setItems(parsedData.length > 0 ? parsedData : mockData);
    } catch (error) {
      console.error("Fetch error:", error);
      setItems(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <header className="header-search">
        <div className="search-box">
          <Menu size={20} color="#666" />
          <input 
            className="search-input" 
            type="text" 
            defaultValue='c:"chino kafuu$"' 
          />
          <Plus size={24} color="#666" />
        </div>
      </header>

      <main className="gallery-list">
        {loading && <div style={{padding: '20px', textAlign: 'center'}}>Loading...</div>}
        
        {items.map((item, index) => (
          <div key={index} className="gallery-item">
            <div className="thumbnail-container">
              <img 
                src={item.thumb} 
                alt="cover" 
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = 'https://via.placeholder.com/100x140?text=No+Img';
                }} 
              />
            </div>

            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              <p className="item-uploader">{item.uploader}</p>
              
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(item.rating) ? "#f1c40f" : "none"} 
                    stroke={i < Math.floor(item.rating) ? "#f1c40f" : "#ccc"} 
                  />
                ))}
              </div>

              <div className="footer-info">
                <span className="tag-non-h">{item.tag}</span>
                <div className="meta-right">
                  <span className="lang-code">{item.lang}</span>
                  <span className="date-text">{item.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

// Mock 数据也需要符合接口
const mockData: GalleryItem[] = [
  {
    title: "nullmix",
    uploader: "nullmix",
    thumb: "https://picsum.photos/seed/1/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 11:46", rating: 4
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  },
  {
    title: "(C97) [fluffy x fluffy (Waki, Takazin)] KONEKO to USAGI no Bath TIME - Kitten and rabbit b...",
    uploader: "BlossomPlus",
    thumb: "https://picsum.photos/seed/2/100/140",
    tag: "NON-H", lang: "ZH", date: "2021-02-04 02:17", rating: 5
  }
];

export default App;