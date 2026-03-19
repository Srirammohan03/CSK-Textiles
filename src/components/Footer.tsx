import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border sticky md:top-[40vh] top-[10vh] z-10 inset-0 md:h-[60vh] h-[90vh]">
      <div className="container mx-auto px-4 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center w-[80%] mx-auto">
          {/* Logo + Brand */}
          <div>
            <div className="flex flex-col items-center">
              <img src="/images/logo.png" className="w-32 mb-4" />
            </div>

            <h3 className="text-xl text-center font-display font-bold text-primary mb-2">
              CSK Textiles Hyderabad
            </h3>

            <p className="text-sm text-muted-foreground text-center">
              Premium men's fabrics and tailoring since 1998. Trusted by
              executives and grooms across Hyderabad for quality suiting,
              shirting, and wedding attire.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-foreground text-3xl mb-4">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/collections/suiting"
                  className="text-muted-foreground hover:text-primary"
                >
                  Suiting Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/collections/shirting"
                  className="text-muted-foreground hover:text-primary"
                >
                  Shirting Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/collections/wedding-sherwani"
                  className="text-muted-foreground hover:text-primary"
                >
                  Wedding & Sherwani
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Info */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold text-foreground md:text-3xl text-xl mb-4">
              Visit Us
            </h4>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  21-1-821, Patel Market,
                  <br />
                  Rikabgunj, Hyderabad 500002
                </span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 XXX XXX XXXX</span>
              </li>

              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-1" />
                <span>
                  Mon - Sat: 10 AM - 8 PM
                  <br />
                  Sunday: Closed
                </span>
              </li>
            </ul>
          </div>

          {/* Empty / extra column for spacing (optional like awwwards style) */}
          <div className="hidden lg:block" />
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Chimanlal Suresh Kumar Textiles Pvt Ltd
        </div>
      </div>
    </footer>
  );
};

export default Footer;
