import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import CutButton from "./CutButton";
import { officeLocations } from "../data/locations";

export default function Contact() {
  return (
    <section className="py-20 md:py-24 bg-paper text-ink px-3 md:px-4" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-ink">Get in Touch</h2>
          <p className="text-xl text-ink/75 max-w-2xl mx-auto">
            Ready to begin your journey? Book a consultation with an AcdyOn advisor.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {officeLocations.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-paper2 border border-line rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-accent" size={24} />
                <h3 className="text-xl font-bold text-ink">{office.country}</h3>
              </div>
              <p className="text-ink/80 font-medium mb-4">{office.name}</p>
              <p className="text-sm text-ink/65 mb-4 leading-relaxed">{office.address}</p>
              <div className="space-y-2 pt-2 border-t border-line">
                <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-ink/75 hover:text-accent transition-colors">
                  <Phone size={16} />
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-ink/75 hover:text-accent transition-colors">
                  <Mail size={16} />
                  {office.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex justify-center"
        >
          <CutButton
            href="#contact"
            variant="solid-accent"
            size="lg"
            className="shadow-lg"
          >
            Book a Consultation
          </CutButton>
        </motion.div>
      </div>
    </section>
  );
}
