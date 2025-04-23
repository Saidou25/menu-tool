import React, { createContext, useContext, useState } from "react";
import {
  Field,
  MenuCategory,
  MenuCustomCategory,
  StyleFormType,
} from "../data/types";

type AppStateContextType = {
  selectedMenu: string;
  setSelectedMenu: (item: string) => void;
  showDropown: boolean;
  setShowDropdown: (item: boolean) => void;
  custom: boolean;
  setCustom: (item: boolean) => void;
  customCategoryList: MenuCategory[];
  setCustomCategoryList: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  menuSampleData: Record<
    string,
    { subtitle?: string; items: Field[]; custom?: string }
  >;
  setMenuSampleData: React.Dispatch<
    React.SetStateAction<
      Record<string, { subtitle?: string; items: Field[]; custom?: string }>
    >
  >;
  setShowDisclaimer: (item: boolean) => void;
  styleForm: StyleFormType;
  setStyleForm: React.Dispatch<React.SetStateAction<StyleFormType>>;
  setShowMarginCategoriesTop: (item: boolean) => void;
  flatItemsCategories: MenuCategory[];
  setFlatItemsCategories: React.Dispatch<React.SetStateAction<MenuCategory[]>>;
  newCustomArray: MenuCustomCategory[];
  showImagesDeleteButtons: boolean;
  showColorInputs: boolean;
  hidePrices: boolean;
  showDecorations: string;
  setShowDecorations: (category: string) => void;
  showJoinInputs: boolean;
  showPaddingCategoriesTop: boolean;
  showMarginCategoriesTop: boolean;
  joinedCategories: Record<string, boolean>;
  setJoinedCategories: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  showDecorationCheckboxes: boolean;
  setShowDecorationCheckboxes: (item: boolean) => void;
  setShowPaddingCategoriesTop: (item: boolean) => void;
  setShowImagesDeleteButtons: (item: boolean) => void;
  setShowJoinInputs: (item: boolean) => void;
  setHidePrices: (item: boolean) => void;
  setShowColorInputs: (item: boolean) => void;
  setNewCustomArray: React.Dispatch<React.SetStateAction<MenuCustomCategory[]>>;
  showDisclaimer: boolean;
  // setView: React.Dispatch<React.SetStateAction<boolean>>;
  showCategoryImage: boolean;
  setShowCategoryImage: (item: boolean) => void;
  newArray: any[];
  setNewArray: any;
  customCategories: any;
  setCustomCategories: any;
  NewCustomCategories: any;
  setNewCustomCategories: any;
  setShowItems: any;
  showPreviewTool: any;
  setShowPreviewTool: (item: boolean) => void;
  showModal: boolean;
  setShowModal: (item: boolean) => void;
  fadeInOut: boolean;
  setFadeInOut: (item: boolean) => void;
  menuPreview: boolean;
  setMenuPreview: (item: boolean) => void;
  localSelectedCategoryItems: any;
  setLocalSelectedCategoryItems: any;
  consolidatedView: any;
  setConsolidatedView: any;
  showSubtitleInput: string;
  setShowSubtitleInput: any;
  subtitle: string;
  setSubtitle: any;
  isDesserts: boolean;
  setIsDesserts: (item: boolean) => void;
  showItems: any;
};

// Create Context
const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

// Custom Hook
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};

// Provider Component
export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [custom, setCustom] = useState(false);
  const [showDropown, setShowDropdown] = useState(false);
  const [customCategoryList, setCustomCategoryList] = useState<MenuCategory[]>(
    []
  );
  const [showMarginCategoriesTop, setShowMarginCategoriesTop] = useState(false);
  const [showCategoryImage, setShowCategoryImage] = useState(false);
  const [menuSampleData, setMenuSampleData] = useState<
    Record<string, { subtitle?: string; items: Field[]; custom?: string }>
  >({});
  const [newCustomArray, setNewCustomArray] = useState<MenuCustomCategory[]>(
    []
  );
  const [showJoinInputs, setShowJoinInputs] = useState(false);
  const [flatItemsCategories, setFlatItemsCategories] = useState<
    MenuCategory[]
  >([]);

  const [showImagesDeleteButtons, setShowImagesDeleteButtons] = useState(false);
  const [showPaddingCategoriesTop, setShowPaddingCategoriesTop] =
    useState(false);

  const [joinedCategories, setJoinedCategories] = useState<
    Record<string, boolean>
  >({});
  const [showDecorationCheckboxes, setShowDecorationCheckboxes] =
    useState(false);
  // const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDecorations, setShowDecorations] = useState("");
  const [hidePrices, setHidePrices] = useState(false);
  const [showColorInputs, setShowColorInputs] = useState(false);

  const [newArray, setNewArray] = useState<MenuCategory[]>([]);
  const [customCategories, setCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [NewCustomCategories, setNewCustomCategories] = useState<
    { categoryItem: string }[]
  >([]);
  const [showItems, setShowItems] = useState<string[]>([]);
  const [showPreviewTool, setShowPreviewTool] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeInOut, setFadeInOut] = useState(false);
  const [menuPreview, setMenuPreview] = useState<boolean>(() => false);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(() => false);
  const [localSelectedCategoryItems, setLocalSelectedCategoryItems] = useState<
    Record<string, { subtitle?: string; items: Field[] }>
  >({});
  const [consolidatedView, setConsolidatedView] = useState<
    {
      item: boolean;
      title: string;
    }[]
  >([]);
  const [showSubtitleInput, setShowSubtitleInput] = useState(""); // Toggles subtitle inputs
  const [subtitle, setSubtitle] = useState("");
  const [isDesserts, setIsDesserts] = useState(false);

  const [styleForm, setStyleForm] = useState<StyleFormType>({
    menuWidth: 0,
    menuHeight: 0,
    backgroundImage: "",
    topImage: "",
    topImageSize: 50,
    bottomImage: "",
    bottomImageSize: 20,
    pagePaddingTopAndBottom: 0,
    pagePaddingLeftAndRight: 0,
    categoryFontSize: 30,
    categoriesMarginBottom: 0,
    categoryMarginBottom: 0,
    itemFontSize: 20,
    itemMarginBottom: 0,
    descriptionFontSize: 15,
    descriptionMarginBottom: 0,
    guyBackgroundColor: "",
    guyTop: "",
    guyBottom: "",
    guyTopSize: 50,
    guyBottomSize: 50,
    guyTopMarginBottom: 0,
    guyBottomMarginBottom: 0,
    title: "",
    titleSize: 20,
    titlePaddingBottom: 0,
    titlePaddingTop: 0,
    titleBackgroundColor: "",
    footerSize: 20,
    footer: "",
    titleMarginBottom: 0,
    footerMarginBottom: 0,
    pageBackground: "",
    sectionBackground: [],
    categoryImage: [],
    descriptionLetterColor: [],
    titleColor: "",
    categoryColor: "",
    priceColor: "",
    priceSize: 15,
    menuItemColor: "",
    menuItemDescriptionColor: "",
    textTopColor: "",
    textBottomColor: "",
    footerTextColor: "",
    subtitleFontSize: 15,
    subtitleFontColor: [],
    subtitleColor: "",
    subtitlePaddingBottom: 0,
    decoration: "",
    gapTextTop: -11,
    contentContainerWidth: 45,
    paddingCategoriesLeftRight: 0,
    paddingCategoriesTop: [],
    marginCategoriesTop: [],
    paddingDecoration: 0,
    decorationWidth: 90,
    footerPaddingPaddingTop: 0,
    footerPaddingBottom: 0,
    categoryImageSize: [],
  });

  return (
    <AppStateContext.Provider
      value={{
        selectedMenu,
        setSelectedMenu,
        showDecorationCheckboxes,
        setShowDecorationCheckboxes,
        custom,
        setCustom,
        showDropown,
        setShowDropdown,
        setCustomCategoryList,
        customCategoryList,
        menuSampleData,
        setMenuSampleData,
        styleForm,
        setStyleForm,
        flatItemsCategories,
        setFlatItemsCategories,
        setNewCustomArray,
        newCustomArray,
        showColorInputs,
        showJoinInputs,
        showDisclaimer,
        joinedCategories,
        setJoinedCategories,
        setShowMarginCategoriesTop,
        hidePrices,
        setShowColorInputs,
        setHidePrices,
        setShowJoinInputs,
        showDecorations,
        setShowDecorations,
        setShowImagesDeleteButtons,
        setShowPaddingCategoriesTop,
        setShowDisclaimer,
        showPaddingCategoriesTop,
        showMarginCategoriesTop,
        showImagesDeleteButtons,
        showCategoryImage,
        setShowCategoryImage,
        newArray,
        setNewArray,
        customCategories,
        setCustomCategories,
        NewCustomCategories,
        setNewCustomCategories,
        showItems,
        setShowItems,
        showPreviewTool,
        setShowPreviewTool,
        showModal,
        setShowModal,
        fadeInOut,
        setFadeInOut,
        menuPreview,
        setMenuPreview,
        localSelectedCategoryItems,
        setLocalSelectedCategoryItems,
        consolidatedView,
        setConsolidatedView,
        showSubtitleInput,
        setShowSubtitleInput,
        subtitle,
        setSubtitle,
        isDesserts,
        setIsDesserts,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
