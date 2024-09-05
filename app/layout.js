import styles from './globals.css';
import { josefin_sans, ubuntu_mono } from '@/app/ui/fonts';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className={`${ josefin_sans.className } antialiased`}>
          <p>Website by Rishi Aitha</p>
          <p>Email: rishi.aitha@gmail.com</p>
          <p>Github: <a href='https://github.com/RishiAitha'>https://github.com/RishiAitha</a></p>
          <p>Made for Downingtown East TSA</p>
          <div>
            <p>Some frontend inspired/learned from: </p>
            <p>Hyperplexed</p>
            <p>Ashley Saleem-West</p>
            <p>Josh Collinsworth</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
