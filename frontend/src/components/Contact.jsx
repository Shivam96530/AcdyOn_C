import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import Button from "./Button";
import { officeLocations } from "../data/locations";

export default function Contact() {
  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
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
              className="bg-zinc-50 rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-acdyon-black" size={24} />
                <h3 className="text-xl font-bold">{office.country}</h3>
              </div>
              <p className="text-zinc-600 mb-4">{office.name}</p>
              <p className="text-sm text-zinc-500 mb-4">{office.address}</p>
              <div className="space-y-2">
                <a href={`tel:${office.phone}`} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-acdyon-black">
                  <Phone size={16} />
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-acdyon-black">
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
          className="text-center"
        >
          <Button variant="primary" size="xl">
            Book a Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
