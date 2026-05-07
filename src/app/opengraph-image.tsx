import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at top left, rgba(72,128,255,0.32), transparent 36%), radial-gradient(circle at bottom right, rgba(18,212,196,0.22), transparent 32%), linear-gradient(135deg, #07111f 0%, #0a1730 48%, #0d2144 100%)',
          color: '#f8fbff',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 28,
            borderRadius: 28,
            border: '1px solid rgba(147, 197, 253, 0.14)',
            background: 'linear-gradient(180deg, rgba(10, 20, 38, 0.84), rgba(7, 14, 28, 0.68))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -100,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(76, 129, 255, 0.3), transparent 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15, 198, 182, 0.2), transparent 68%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 88,
            top: 94,
            width: 330,
            height: 442,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '28px 26px',
            borderRadius: 28,
            border: '1px solid rgba(119, 171, 255, 0.18)',
            background: 'linear-gradient(180deg, rgba(19, 35, 63, 0.88), rgba(12, 22, 42, 0.78))',
            boxShadow: '0 30px 90px rgba(5, 11, 24, 0.42)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #5fa8ff 0%, #2c6dff 100%)',
                  fontSize: 28,
                  fontWeight: 700,
                }}
              >
                N
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 28, fontWeight: 700 }}>NetworkAI</div>
                <div style={{ fontSize: 14, color: 'rgba(226, 236, 255, 0.7)' }}>
                  Smart Infrastructure Solutions
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              {['ICT Systems', 'ELV', 'Smart Building', 'Hospitality'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'flex',
                    padding: '8px 14px',
                    borderRadius: 999,
                    border: '1px solid rgba(122, 167, 255, 0.18)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    fontSize: 14,
                    color: 'rgba(236, 243, 255, 0.82)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {[
              'Advisory, design, and deployment for premium hospitality and enterprise projects.',
              'Bilingual website and case-study-ready presentation across Vietnamese and English.',
            ].map((line) => (
              <div
                key={line}
                style={{
                  display: 'flex',
                  padding: '14px 16px',
                  borderRadius: 18,
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: 16,
                  lineHeight: 1.4,
                  color: 'rgba(238, 244, 255, 0.84)',
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            padding: '86px 92px',
            paddingRight: 460,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '10px 18px',
                borderRadius: 999,
                background: 'rgba(91, 145, 255, 0.14)',
                border: '1px solid rgba(91, 145, 255, 0.22)',
                color: '#a8c9ff',
                fontSize: 20,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Premium Systems Integration
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                maxWidth: 620,
              }}
            >
              <div
                style={{
                  fontSize: 66,
                  fontWeight: 700,
                  lineHeight: 1.04,
                  letterSpacing: '-0.04em',
                }}
              >
                Smart infrastructure for modern hospitality spaces.
              </div>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.45,
                  color: 'rgba(228, 238, 255, 0.78)',
                }}
              >
                Strategy, systems, and execution for ICT, ELV, smart home, and smart
                building environments.
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  minWidth: 120,
                }}
              >
                <div style={{ fontSize: 38, fontWeight: 700 }}>18+</div>
                <div style={{ fontSize: 16, color: 'rgba(228, 238, 255, 0.68)' }}>
                  Years of field experience
                </div>
              </div>
              <div
                style={{
                  width: 1,
                  alignSelf: 'stretch',
                  background: 'rgba(255, 255, 255, 0.12)',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  minWidth: 120,
                }}
              >
                <div style={{ fontSize: 38, fontWeight: 700 }}>VN / EN</div>
                <div style={{ fontSize: 16, color: 'rgba(228, 238, 255, 0.68)' }}>
                  Bilingual presentation-ready content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
