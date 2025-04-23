import Logo from "./Logo"

export default function Logos() {
  return (
    <div className="col-1 pt-3">
        <>
          <Logo
            className="restart"
            h1ClassName="restart-tool"
            title=""
            subtitle="Restart"
            // fadeLogoInOut={fadeLogoInOut}
          />
          <Logo
            className="preview-btn"
            h1ClassName="preview-tool"
            title=""
            subtitle="Preview menu"
            // fadeLogoInOut={fadeLogoInOut}
          />
        </>
      </div>
  )
}
