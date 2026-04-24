import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

interface FooterProps {
  variant?: "static" | "sticky";
}

const Footer = ({ variant = "static" }: FooterProps) => {
  const isSticky = variant === "sticky";

  return (
    <footer
      className={`bg-muted border-t border-border z-10 ${
        isSticky ? "md:sticky md:top-[40vh] md:h-[60vh]" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 pt-10 pb-4">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 items-start w-full md:w-[90%] lg:w-[80%] mx-auto">
          {/* Logo */}
          <div className="flex flex-col items-start text-left">
            <img src="/images/logo.png" className="w-32 md:w-40 mb-6" />

            <h3 className="text-xl md:text-2xl font-display font-bold text-primary mb-4">
              CSK Textiles Hyderabad
            </h3>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Premium men's fabrics and tailoring since 1991. Trusted by
              executives and grooms across Hyderabad for quality suiting,
              shirting, and wedding attire.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-semibold text-foreground text-2xl md:text-3xl mb-6">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <Link
                  to="/collections/suiting"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Suiting Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/shirting"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Shirting Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/wedding"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Wedding & Sherwani
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>

              {/* Terms moved here */}
              <li className="pt-3 border-t border-border">
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="flex flex-col items-start text-left">
            <h4 className="font-semibold text-foreground text-2xl md:text-3xl mb-6">
              Visit Us
            </h4>

            <ul className="space-y-4 text-sm md:text-base text-muted-foreground">
              <li className="flex items-start gap-3 justify-start">
                <MapPin className="h-5 w-5 mt-1 text-primary shrink-0" />
                <span>
                  R J Market, 21-1-821/1, Patel Market,
                  <br />
                  Rikabgunj, Hyderabad 500002
                </span>
              </li>

              <li className="flex items-start gap-3 justify-start">
                <MapPin className="h-5 w-5 mt-1 text-primary shrink-0" />
                <span>
                  40, Mehdipatnam Rd, Ambedkar Colony,
                  <br />
                  Mehdipatnam, Hyderabad, Telangana 500006
                </span>
              </li>

              <li className="flex items-center gap-3 justify-start">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+91 4024567139 | +91 9030609700</span>
              </li>

              <li className="flex items-start gap-3 justify-start">
                <Clock className="h-5 w-5 mt-1 text-primary shrink-0" />
                <span>
                  Mon - Sat: 10 AM - 8 PM
                  <br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-2 flex items-center justify-start gap-5 w-full md:w-[90%] lg:w-[80%] mx-auto">
          <a
            href="https://www.instagram.com/csktextiles/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background shadow-md hover:scale-110 transition"
          >
            <Instagram className="w-5 h-5 text-primary" />
          </a>

          <a
            href="https://www.facebook.com/csktextileshyderabad/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-background shadow-md hover:scale-110 transition"
          >
            <Facebook className="w-5 h-5 text-primary" />
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-2 pt-4 text-center  text-sm text-muted-foreground">
          © {new Date().getFullYear()} Chimanlal Suresh Kumar Textiles Pvt Ltd.
          All rights reserved.
          <br className="md:hidden" />
          <span className="mx-2 hidden md:inline">|</span>
          Powered by{" "}
          <Link
            to="https://www.outrightcreators.com/"
            className="font-medium text-[#f5d611] hover:underline"
          >
            Outright Creators
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
