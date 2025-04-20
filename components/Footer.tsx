const Footer = () => {
  return (
    <footer className="py-6 px-4 text-center bg-[var(--background)] text-[var(--foreground)] rounded-xl ">
      <div className="max-w-4xl mx-auto">
        <p className="text-lg font-light">
          © {new Date().getFullYear()} Matu Tutor. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline">
            Terms of Service
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
          <a href="https://www.youtube.com/@abuget8096">
          youtube-Changle
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;