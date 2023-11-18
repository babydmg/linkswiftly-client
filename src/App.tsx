import { useState, FormEvent } from 'react';
import styles from './styles/App.module.css';

const App = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch('https://linkswiftly-server.vercel.app/new', {
      method: 'POST',
      body: {
        // @ts-ignore
        full_url: longUrl,
        short_url: shortUrl,
      },
    })
      .then(async (res) => {
        const body = await res.json();
        console.log(body);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <h1>Link Swiftly</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label className={styles.label}>Type the url</label>
            <input
              type='text'
              placeholder='https://example.com/long-url-here'
              className={styles.input}
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
          </div>
          <div className={styles.input_box}>
            <label className={styles.label}>Shorter</label>
            <input
              type='text'
              placeholder='abc123'
              className={styles.input}
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
            />
          </div>

          <button type='submit' className={styles.btn}>
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
