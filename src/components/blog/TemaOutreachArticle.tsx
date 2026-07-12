import temaFlyer from "@/assets/blog/tema-outreach-flyer.jpeg.asset.json";

export const TemaOutreachArticle = () => (
  <>
    <p className="text-xl font-medium text-foreground italic">
      Bringing Free Healthcare to the Tema Community Through Strategic Partnership
    </p>

    <p>
      <strong>Tema, Greater Accra Region — 25th July 2026</strong> — Viva Health Medical Foundation,
      in partnership with the <strong>Eastern Naval Command</strong> and the <strong>Tema Youth Association</strong>,
      is proud to announce a <strong>Free Medical Outreach</strong> for the Tema community. The event
      will take place at the <strong>Tema Naval Base, Junior Rates Mess</strong>, extending accessible
      healthcare to residents who need it most.
    </p>

    <figure className="my-8">
      <img src={temaFlyer.url} alt="Free Medical Outreach at Tema Naval Base" className="rounded-xl w-full" />
      <figcaption className="text-center text-sm text-muted-foreground mt-3">
        Official flyer for the Free Medical Outreach in Tema on 25th July 2026
      </figcaption>
    </figure>

    <h2>Services Available</h2>

    <p>The outreach will provide a range of essential health services, including:</p>
    <ul>
      <li><strong>General medical screening and consultation</strong> — comprehensive health checks and professional medical advice</li>
      <li><strong>Mental health and education</strong> — counseling, stress management, and emotional wellness support</li>
      <li><strong>Basic laboratory investigations</strong> — rapid diagnostic tests to support early detection</li>
      <li><strong>Health education and promotion</strong> — practical guidance for healthier lifestyles and disease prevention</li>
    </ul>

    <h2>Event Details</h2>

    <ul>
      <li><strong>Date:</strong> 25th July 2026</li>
      <li><strong>Venue:</strong> Tema Naval Base, Junior Rates Mess</li>
      <li><strong>Target:</strong> Tema community residents and surrounding areas</li>
    </ul>

    <h2>A Shared Commitment to Healthier Communities</h2>

    <p>
      This collaboration reflects Viva Health Medical Foundation's continued commitment to bridging
      healthcare gaps across Ghana through strategic partnerships. By joining forces with the
      Eastern Naval Command and the Tema Youth Association, we are bringing quality healthcare closer
      to communities that need it most.
    </p>

    <p>
      We look forward to serving the Tema community and extend our sincere gratitude to the Eastern
      Naval Command and Tema Youth Association for their partnership in making this outreach possible.
    </p>

    <p className="font-semibold text-foreground">
      For more information, visit <a href="https://www.vivahealthmedfoundation.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.vivahealthmedfoundation.org</a>.
    </p>
  </>
);
