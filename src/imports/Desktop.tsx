import imgPondInTheWoods1 from "../assets/pond-in-the-woods.png";
import imgTheInteriorOfThePalmHouseOnThePfaueninsel1 from "../assets/palm-house.png";

export default function Desktop() {
  return (
    <div className="bg-white relative size-full" data-name="Desktop">
      <div className="absolute contents left-[-102px] top-[-5px]" data-name="Landing Screen">
        <div className="absolute aspect-[3000/2240] left-[-102px] right-[-51px] top-[-5px]" data-name="Pond in the Woods 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPondInTheWoods1} />
        </div>
        <p className="-translate-x-1/2 absolute font-['Plaster:Regular',sans-serif] h-[116px] leading-[normal] left-1/2 not-italic text-[#fff8d9] text-[96px] text-center top-[343px] w-[776px] whitespace-pre-wrap">Rachel Rafik</p>
        <div className="-translate-x-1/2 absolute font-['Ephesis:Regular',sans-serif] h-[100px] leading-[normal] left-1/2 not-italic text-[#fff8d9] text-[52px] text-center top-[459px] w-[556px] whitespace-pre-wrap">
          <p className="mb-0">Developer, Artist, Designer</p>
          <p>&nbsp;</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Pompiere:Regular',sans-serif] h-[56px] justify-center leading-[normal] left-[27px] not-italic text-[#d5b669] text-[20px] top-[967px] w-[375px] whitespace-pre-wrap">
          <p className="mb-0">Pond in the Woods • Narcisse Virgile Dise de la Peña</p>
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="absolute contents left-[53px] top-[1248px]" data-name="About Me">
        <div className="absolute h-[512px] left-[53px] rounded-[25px] top-[1248px] w-[477px]" data-name="The Interior of the Palm House on the Pfaueninsel 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[25px] size-full" src={imgTheInteriorOfThePalmHouseOnThePfaueninsel1} />
        </div>
        <div className="absolute bg-[rgba(217,217,217,0)] border border-[#fff8d9] border-solid h-[477px] left-[73px] rounded-[25px] top-[1265px] w-[437px]" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Pompiere:Regular',sans-serif] justify-center leading-[normal] left-[53px] not-italic text-[20px] text-black top-[1799px] whitespace-nowrap">
          <p className="mb-0">The Interior of the Palm House on the Pfaueninsel Near Potsdam • Carl Blechen</p>
          <p>&nbsp;</p>
        </div>
        <p className="absolute font-['Limelight:Regular',sans-serif] h-[109px] leading-[normal] not-italic right-[389px] text-[#494d17] text-[84px] text-center top-[1248px] translate-x-1/2 w-[574px] whitespace-pre-wrap">ABOUT ME</p>
        <div className="absolute font-['Gowun_Dodum:Regular',sans-serif] leading-[0] not-italic right-[604px] text-[21px] text-black text-justify top-[1361px] translate-x-full w-[552px] whitespace-pre-wrap">
          <p className="mb-0">
            <span className="leading-[normal]">{`I’m a `}</span>
            <span className="leading-[normal] text-[#494d17]">Moroccan-Venezuelan</span>
            <span className="leading-[normal]">{` (50/50 mix) living in the US. I speak `}</span>
            <span className="leading-[normal] text-[#494d17]">3 languages</span>
            <span className="leading-[normal]">, and my goal is to learn one per continent.</span>
          </p>
          <p className="leading-[normal] mb-0">&nbsp;</p>
          <p className="mb-0">
            <span className="leading-[normal]">{`I’m a major in `}</span>
            <span className="leading-[normal] text-[#494d17]">{`Computer Science `}</span>
            <span className="leading-[normal]">{`studying at `}</span>
            <span className="leading-[normal] text-[#494d17]">Purdue University</span>
            <span className="leading-[normal]">, and have been coding for 6 years now. I am concentrating in Software Engineering, Systems Software, and Machine Intelligence. I have two minors: Management and Arabic.</span>
          </p>
          <p className="leading-[normal] mb-0">&nbsp;</p>
          <p>
            <span className="leading-[normal]">{`I’m also an `}</span>
            <span className="leading-[normal] text-[#494d17]">artist</span>
            <span className="leading-[normal]">{`. My specialization is in charcoal. Curious about my pieces? Click `}</span>
            <span className="decoration-dotted leading-[normal] text-[#768a55] underline">here</span>
            <span className="leading-[normal]">. I love art so much that I put some of my favorites throughout this site. Click on them for a surprise!</span>
          </p>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%+19px)] top-[calc(50%+341px)]" data-name="My Skills">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Limelight:Regular',sans-serif] h-[109px] justify-center leading-[0] left-[calc(50%+19px)] not-italic text-[#494d17] text-[84px] text-center top-[calc(50%+341px)] w-[574px]">
          <p className="leading-[normal] whitespace-pre-wrap">MY SKILLS</p>
        </div>
      </div>
    </div>
  );
}
