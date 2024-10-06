import PdfLogo from "../../../assets/svg/pdf.svg";
import WordLogo from "../../../assets/svg/word.svg";
import XlsxLogo from "../../../assets/svg/xlsx.svg";
import AviLogo from "../../../assets/svg/avi.svg";
import CssLogo from "../../../assets/svg/css.svg";
import CsvLogo from "../../../assets/svg/csv.svg";
import DbLogo from "../../../assets/svg/db.svg";
import ExeLogo from "../../../assets/svg/exe.svg";
import FlacLogo from "../../../assets/svg/flac.svg";
import GifLogo from "../../../assets/svg/gif.svg";
import HtmlLogo from "../../../assets/svg/html.svg";
import JpegLogo from "../../../assets/svg/jpeg.svg";
import JpgLogo from "../../../assets/svg/jpg.svg";
import JsonLogo from "../../../assets/svg/json.svg";
import MkvLogo from "../../../assets/svg/mkv.svg";
import MovLogo from "../../../assets/svg/mov.svg";
import Mp3Logo from "../../../assets/svg/mp3.svg";
import Mp4Logo from "../../../assets/svg/mp4.svg";
import PngLogo from "../../../assets/svg/png.svg";
import PptLogo from "../../../assets/svg/ppt.svg";
import RarLogo from "../../../assets/svg/rar.svg";
import ShLogo from "../../../assets/svg/sh.svg";
import TarLogo from "../../../assets/svg/tar.svg";
import TxtLogo from "../../../assets/svg/txt.svg";
import WavLogo from "../../../assets/svg/wav.svg";
import XmlLogo from "../../../assets/svg/xml.svg";
import ZipLogo from "../../../assets/svg/zip.svg";
import SwiftLogo from "../../../assets/svg/zip.svg";
import JavaScriptLogo from "../../../assets/svg/javascript.svg";
import TypeScriptLogo from "../../../assets/svg/typescript.svg";
import JavaLogo from "../../../assets/svg/java.svg";
import RubyLogo from "../../../assets/svg/ruby.svg";
import LuaLogo from "../../../assets/svg/lua.svg";
import PerlLogo from "../../../assets/svg/perl.svg";
import PythonLogo from "../../../assets/svg/python.svg";
import RustLogo from "../../../assets/svg/rust.svg";
import GoLogo from "../../../assets/svg/go.svg";
import PhpLogo from "../../../assets/svg/php.svg";
import CppLogo from "../../../assets/svg/c.svg";
import CSharpLogo from "../../../assets/svg/csharp.svg";
import DirectoryLogo from "../../../assets/svg/directory.svg";
import SvgLogo from "../../../assets/svg/svg.svg";
import DefaultFileLogo from "../../../assets/svg/defaultFile.svg";
import NotFoundLogo from "../../../assets/svg/not-found.svg";

export const getLogoImage = (extension: string) => {
  const lowerCase = extension.toLowerCase();
  switch (lowerCase) {
    case ".pdf":
      return PdfLogo;
    case ".docx" || ".doc":
      return WordLogo;
    case ".xls":
      return XlsxLogo;
    case ".xlsx":
      return XlsxLogo;
    //ppt:
    case ".ppt":
      return PptLogo;
    case ".pptx":
      return PptLogo; // text:
    case ".rtf":
      return TxtLogo;
    case ".txt":
      return TxtLogo;
    // image
    case ".jpg":
      return JpgLogo;
    case ".jpeg":
      return JpegLogo;
    case ".png":
      return PngLogo;
    case ".gif":
      return GifLogo;
    //video
    case ".mp4":
      return Mp4Logo;
    case ".avi":
      return AviLogo;
    case ".mkv":
      return MkvLogo;
    case ".mov":
      return MovLogo;
    // audio
    case ".mp3":
      return Mp3Logo;
    case ".wav":
      return WavLogo;
    case ".flac":
      return FlacLogo;
    // archive
    case ".zip":
      return ZipLogo;
    case ".rar":
      return RarLogo;
    case ".tar.gz":
      return TarLogo;
    // html
    case ".html":
      return HtmlLogo;
    // css
    case ".css":
      return CssLogo;
    // json
    case ".json":
      return JsonLogo;
    // xml
    case ".xml":
      return XmlLogo;
    // csv
    case ".csv":
      return CsvLogo;
    // database
    case ".db":
      return DbLogo;
    case ".sqlite":
      return DbLogo;
    // executable
    case ".msi":
      return ExeLogo;
    case ".exe":
      return ExeLogo;
    // shell
    case ".sh":
      return ShLogo;
    case ".jsx":
      return JavaScriptLogo;
    case ".tsx":
      return TypeScriptLogo;
    case ".js":
      return JavaScriptLogo;
    case ".ts":
      return TypeScriptLogo;
    case ".java":
      return JavaLogo;
    case ".py":
      return PythonLogo;
    case ".c" || ".cpp":
      return CppLogo;
    case ".cs":
      return CSharpLogo;
    case ".php":
      return PhpLogo;
    case ".rb":
      return RubyLogo;
    case ".swift":
      return SwiftLogo;
    case ".go":
      return GoLogo;
    case ".rust":
      return RustLogo;
    case ".perl":
      return PerlLogo;
    case ".lua":
      return LuaLogo;
    case ".directory":
      return DirectoryLogo;
    case ".svg":
      return SvgLogo;
    default:
      return DefaultFileLogo; // Return null for unsupported file types
  }
};

export const getNotFoundImage = () => {
  return NotFoundLogo;
};

