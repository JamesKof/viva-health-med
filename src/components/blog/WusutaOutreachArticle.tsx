import communityPhoto from "@/assets/blog/wusuta-community.jpg.asset.json";
import leadershipPhoto from "@/assets/blog/wusuta-leadership.jpg.asset.json";
import pharmacyPhoto from "@/assets/blog/wusuta-pharmacy.jpg.asset.json";

const ArticlePhoto = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <figure className="my-10">
    <img
      src={src}
      alt={alt}
      className="w-full rounded-xl object-cover"
      loading="lazy"
      decoding="async"
    />
    <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
  </figure>
);

export const WusutaOutreachArticle = () => (
  <>
    <p className="text-xl font-medium text-foreground italic">
      Bringing preventive healthcare and essential medical services closer to families in the North Dayi District.
    </p>

    <p>
      <strong>Wusuta, Volta Region — Saturday, 26th September 2026</strong> — Viva Health Medical
      Foundation, in collaboration with the Wusuta Community and the District Health Directorate,
      successfully organised a free health screening outreach for residents of Wusuta in the North
      Dayi District.
    </p>

    <p>
      Led by <strong>Lt. Col. Nutsugah</strong>, Founder of Viva Health Medical Foundation, and
      <strong> Col. Penti</strong>, who heads the Wusuta community, the initiative brought essential
      healthcare services directly to residents at no cost. It also created an important opportunity
      for beneficiaries to receive professional medical advice and identify health concerns early.
    </p>

    <ArticlePhoto
      src={communityPhoto.url}
      alt="Wusuta residents gathered for the Viva Health Medical Foundation outreach"
      caption="Community members gathered in Wusuta to access free health services."
    />

    <h2>Comprehensive Care Within the Community</h2>

    <p>
      The outreach formed part of ongoing efforts to promote preventive healthcare, encourage early
      detection and improve access to essential services. Beneficiaries received free dental
      screening, blood pressure and weight checks, specialist consultations and medication, subject
      to availability.
    </p>

    <p>
      Dental care went beyond screening: clinicians completed approximately <strong>20 dental
      extractions</strong> for patients who required the procedure. This direct treatment helped
      address immediate oral health needs that might otherwise have remained untreated.
    </p>

    <ArticlePhoto
      src={pharmacyPhoto.url}
      alt="Viva Health volunteers preparing medication at the Wusuta outreach"
      caption="The outreach team prepared medication and supplies for beneficiaries."
    />

    <h2>429 People Reached</h2>

    <p>
      A total of <strong>429 people</strong> benefited from the exercise, reflecting strong
      community participation. Those reached included:
    </p>

    <ul>
      <li>200 men</li>
      <li>112 women</li>
      <li>37 children</li>
      <li>80 adolescents reached through menstrual hygiene education and support</li>
    </ul>

    <p>
      The menstrual hygiene component reflected the Foundation&apos;s broader commitment to adolescent
      health and wellbeing, complementing the clinical services with practical health education.
    </p>

    <h2>Three Severe Cases Identified for Follow-up</h2>

    <p>
      One of the outreach&apos;s most significant outcomes was the identification of three severe cases
      requiring further medical attention. Plans are being made to support the affected individuals
      with further assessment, referral and treatment in Accra.
    </p>

    <p>
      Their identification demonstrates why community-based screening matters: it can uncover serious
      health concerns that may otherwise go unnoticed and connect vulnerable residents with the
      specialist care they need.
    </p>

    <ArticlePhoto
      src={leadershipPhoto.url}
      alt="Viva Health Medical Foundation leadership addressing the Wusuta outreach team"
      caption="Outreach leaders and volunteers coordinated the day&apos;s community health activities."
    />

    <h2>Partnership That Extends Access</h2>

    <p>
      The collaboration between Viva Health Medical Foundation, the Wusuta Community and the District
      Health Directorate created a trusted platform for residents to receive care close to home. It
      also promoted greater awareness of personal health and the importance of seeking timely medical
      attention.
    </p>

    <p>
      Following the outreach, priority will be given to the three severe cases, while continued
      engagement with community stakeholders and health authorities will support referrals and
      continuity of care.
    </p>

    <p>
      Through initiatives like the Wusuta outreach, Viva Health Medical Foundation continues to bring
      essential services closer to underserved communities and contribute to healthier lives across
      Ghana.
    </p>
  </>
);