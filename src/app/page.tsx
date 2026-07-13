import { SkipLink } from '@/components/layout/SkipLink';
import { Nav } from '@/components/navigation/Nav';
import { NarrativeController } from '@/components/layout/NarrativeController';
import { SceneLayer } from '@/components/three/SceneLayer';
import { JsonLd } from '@/components/layout/JsonLd';
import { Footer } from '@/components/layout/Footer';
import { S1Opening } from '@/components/sections/S1Opening';
import { S2Problem } from '@/components/sections/S2Problem';
import { S3Idea } from '@/components/sections/S3Idea';
import { S4HowItWorks } from '@/components/sections/S4HowItWorks';
import { S5Map } from '@/components/sections/S5Map';
import { S6Forecast } from '@/components/sections/S6Forecast';
import { S7Delivers } from '@/components/sections/S7Delivers';
import { S8Limitations } from '@/components/sections/S8Limitations';
import { S9About } from '@/components/sections/S9About';
import { S10Closing } from '@/components/sections/S10Closing';

export default function Home() {
  return (
    <>
      <JsonLd />
      <SkipLink />
      <Nav />
      <NarrativeController />
      <SceneLayer />
      <main id="conteudo" className="relative z-10">
        <S1Opening />
        <S2Problem />
        <S3Idea />
        <S4HowItWorks />
        <S5Map />
        <S6Forecast />
        <S7Delivers />
        <S8Limitations />
        <S9About />
        <S10Closing />
      </main>
      <Footer />
    </>
  );
}
