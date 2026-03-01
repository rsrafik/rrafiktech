import imgPondInTheWoods1 from "../assets/pond-in-the-woods.png";
import imgTheInteriorOfThePalmHouseOnThePfaueninsel1 from "../assets/palm-house.png";

export default function Mobile() {
  return (
    <div className="bg-white relative size-full" data-name="Mobile">
      <div className="absolute contents left-[-216px] right-[-217px] top-[-33px]" data-name="Landing Screen">
        <div className="absolute aspect-[808/1020] left-[-216px] right-[-217px] top-[-33px]" data-name="Pond in the Woods 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPondInTheWoods1} />
        </div>
        <div className="absolute font-['Plaster:Regular',sans-serif] leading-[normal] left-[42px] not-italic right-[41px] text-[#fff8d9] text-[70px] text-center top-[364px] whitespace-nowrap">
          <p className="mb-0">Rachel</p>
          <p>Rafik</p>
        </div>
        <div className="absolute font-['Ephesis:Regular',sans-serif] h-[49px] leading-[normal] left-[8px] not-italic right-[7px] text-[#fff8d9] text-[27px] text-center top-[552px] whitespace-pre-wrap">
          <p className="mb-0">Developer, Artist, Designer</p>
          <p>&nbsp;</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Pompiere:Regular',sans-serif] h-[56px] justify-center leading-[normal] left-[31px] not-italic right-[-31px] text-[#d5b669] text-[20px] top-[974px] whitespace-pre-wrap">
          <p className="mb-0">Pond in the Woods • Narcisse Virgile Dise de la Peña</p>
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="absolute contents left-[5px] right-[7px] top-[1089px]" data-name="About Me">
        <div className="absolute aspect-[2794/3000] left-[30px] right-[32px] rounded-[25px] top-[1089px]" data-name="The Interior of the Palm House on the Pfaueninsel 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[25px] size-full" src={imgTheInteriorOfThePalmHouseOnThePfaueninsel1} />
        </div>
        <div className="absolute bg-[rgba(217,217,217,0)] border border-[#fff8d9] border-solid h-[310px] left-[40px] right-[42px] rounded-[25px] top-[1102px]" />
        <div className="-translate-y-1/2 absolute flex flex-col font-['Pompiere:Regular',sans-serif] justify-center leading-[normal] left-[8px] not-italic right-[9px] text-[15px] text-black top-[1453px] whitespace-nowrap">
          <p className="mb-0">The Interior of the Palm House on the Pfaueninsel Near Potsdam • Carl Blechen</p>
          <p>&nbsp;</p>
        </div>
        <p className="absolute font-['Limelight:Regular',sans-serif] h-[72px] leading-[normal] left-[5px] not-italic right-[7px] text-[#494d17] text-[55px] text-center top-[1480px] whitespace-pre-wrap">ABOUT ME</p>
        <div className="absolute font-['Gowun_Dodum:Regular',sans-serif] leading-[0] left-[23px] not-italic right-[25px] text-[21px] text-black text-justify top-[1564px] whitespace-pre-wrap">
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
      <div className="absolute contents left-[5px] right-[7px] top-[2301px]" data-name="My Skills">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Limelight:Regular',sans-serif] h-[72px] justify-center leading-[0] left-[5px] not-italic right-[7px] text-[#494d17] text-[55px] text-center top-[2337px]">
          <p className="leading-[normal] whitespace-pre-wrap">MY SKILLS</p>
        </div>
      </div>
    </div>
  );
}
