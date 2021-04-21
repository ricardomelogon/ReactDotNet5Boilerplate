import React from "react";
import PropTypes from "prop-types";

import styles from "../../assets/jss/sectionStyle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

/**
 * 
 * @param {*} dNone
 * @param {*} dInline
 * @param {*} dInlineBlock
 * @param {*} dBlock
 * @param {*} dTable
 * @param {*} dTableRow
 * @param {*} dTableCell
 * @param {*} dFlex
 * @param {*} dInlineFlex
 * @param {*} flexRow
 * @param {*} flexColumn
 * @param {*} flexRowReverse
 * @param {*} flexColumnReverse
 * @param {*} flexWrap
 * @param {*} flexNowrap
 * @param {*} flexWrapReverse
 * @param {*} justifyContentStart
 * @param {*} justifyContentEnd
 * @param {*} justifyContentCenter
 * @param {*} justifyContentBetween
 * @param {*} justifyContentAround
 * @param {*} alignItemsStart
 * @param {*} alignItemsEnd
 * @param {*} alignItemsCenter
 * @param {*} alignItemsBaseline
 * @param {*} alignItemsStretch
 * @param {*} alignSelfAuto
 * @param {*} alignSelfStart
 * @param {*} alignSelfEnd
 * @param {*} alignSelfCenter
 * @param {*} alignSelfBaseline
 * @param {*} alignSelfStretch
 * @param {*} floatLeft
 * @param {*} floatRight
 * @param {*} floatNone
 * @param {*} positionStatic
 * @param {*} positionRelative
 * @param {*} positionAbsolute
 * @param {*} positionFixed
 * @param {*} positionSticky
 * @param {*} fixedTop
 * @param {*} fixedBottom
 * @param {*} w25
 * @param {*} w50
 * @param {*} w75
 * @param {*} w100
 * @param {*} h25
 * @param {*} h50
 * @param {*} h75
 * @param {*} h100
 * @param {*} mw100
 * @param {*} mh100
 * @param {*} m0
 * @param {*} mt0
 * @param {*} my0
 * @param {*} mr0
 * @param {*} mx0
 * @param {*} mb0
 * @param {*} ml0
 * @param {*} m1
 * @param {*} mt1
 * @param {*} my1
 * @param {*} mr1
 * @param {*} mx1
 * @param {*} mb1
 * @param {*} ml1
 * @param {*} m2
 * @param {*} mt2
 * @param {*} my2
 * @param {*} mr2
 * @param {*} mx2
 * @param {*} mb2
 * @param {*} ml2
 * @param {*} m3
 * @param {*} mt3
 * @param {*} my3
 * @param {*} mr3
 * @param {*} mx3
 * @param {*} mb3
 * @param {*} ml3
 * @param {*} m4
 * @param {*} mt4
 * @param {*} my4
 * @param {*} mr4
 * @param {*} mx4
 * @param {*} mb4
 * @param {*} ml4
 * @param {*} m5
 * @param {*} mt5
 * @param {*} my5
 * @param {*} mr5
 * @param {*} mx5
 * @param {*} mb5
 * @param {*} ml5
 * @param {*} p0
 * @param {*} pt0
 * @param {*} py0
 * @param {*} pr0
 * @param {*} px0
 * @param {*} pb0
 * @param {*} pl0
 * @param {*} p1
 * @param {*} pt1
 * @param {*} py1
 * @param {*} pr1
 * @param {*} px1
 * @param {*} pb1
 * @param {*} pl1
 * @param {*} p2
 * @param {*} pt2
 * @param {*} py2
 * @param {*} pr2
 * @param {*} px2
 * @param {*} pb2
 * @param {*} pl2
 * @param {*} p3
 * @param {*} pt3
 * @param {*} py3
 * @param {*} pr3
 * @param {*} px3
 * @param {*} pb3
 * @param {*} pl3
 * @param {*} p4
 * @param {*} pt4
 * @param {*} py4
 * @param {*} pr4
 * @param {*} px4
 * @param {*} pb4
 * @param {*} pl4
 * @param {*} p5
 * @param {*} pt5
 * @param {*} py5
 * @param {*} pr5
 * @param {*} px5
 * @param {*} pb5
 * @param {*} pl5
 * @param {*} mAuto
 * @param {*} mtAuto
 * @param {*} myAuto
 * @param {*} mrAuto
 * @param {*} mxAuto
 * @param {*} mbAuto
 * @param {*} mlAuto
 * @param {*} textJustify
 * @param {*} textNowrap
 * @param {*} textTruncate
 * @param {*} textLeft
 * @param {*} textRight
 * @param {*} textCenter
 * @param {*} textLowercase
 * @param {*} textUppercase
 * @param {*} textCapitalize
 * @param {*} textWhite
 * @param {*} textBlack
 * @param {*} visible
 * @param {*} invisible
 * @param {*} opacity0
 * @param {*} border
 * @param {*} borderTop
 * @param {*} borderRight
 * @param {*} borderBottom
 * @param {*} borderLeft
 * @param {*} border0
 * @param {*} borderTop0
 * @param {*} borderRight0
 * @param {*} borderBottom0
 * @param {*} borderLeft0
 * @param {*} borderDark
 * @param {*} borderWhite
 * @param {*} bgLight
 * @param {*} flexGrow
 * @param {*} bRounded
 * @param {*} bCircle
 */
function Section(props) {
    const classes = useStyles();
    const {
        children,
        dNone,
        dInline,
        dInlineBlock,
        dBlock,
        dTable,
        dTableRow,
        dTableCell,
        dFlex,
        dInlineFlex,
        flexRow,
        flexColumn,
        flexRowReverse,
        flexColumnReverse,
        flexWrap,
        flexNowrap,
        flexWrapReverse,
        justifyContentStart,
        justifyContentEnd,
        justifyContentCenter,
        justifyContentBetween,
        justifyContentAround,
        alignItemsStart,
        alignItemsEnd,
        alignItemsCenter,
        alignItemsBaseline,
        alignItemsStretch,
        alignSelfAuto,
        alignSelfStart,
        alignSelfEnd,
        alignSelfCenter,
        alignSelfBaseline,
        alignSelfStretch,
        floatLeft,
        floatRight,
        floatNone,
        positionStatic,
        positionRelative,
        positionAbsolute,
        positionFixed,
        positionSticky,
        fixedTop,
        fixedBottom,
        w25,
        w50,
        w75,
        w100,
        h25,
        h50,
        h75,
        h100,
        mw100,
        mh100,
        m0,
        mt0,
        my0,
        mr0,
        mx0,
        mb0,
        ml0,
        m1,
        mt1,
        my1,
        mr1,
        mx1,
        mb1,
        ml1,
        m2,
        mt2,
        my2,
        mr2,
        mx2,
        mb2,
        ml2,
        m3,
        mt3,
        my3,
        mr3,
        mx3,
        mb3,
        ml3,
        m4,
        mt4,
        my4,
        mr4,
        mx4,
        mb4,
        ml4,
        m5,
        mt5,
        my5,
        mr5,
        mx5,
        mb5,
        ml5,
        p0,
        pt0,
        py0,
        pr0,
        px0,
        pb0,
        pl0,
        p1,
        pt1,
        py1,
        pr1,
        px1,
        pb1,
        pl1,
        p2,
        pt2,
        py2,
        pr2,
        px2,
        pb2,
        pl2,
        p3,
        pt3,
        py3,
        pr3,
        px3,
        pb3,
        pl3,
        p4,
        pt4,
        py4,
        pr4,
        px4,
        pb4,
        pl4,
        p5,
        pt5,
        py5,
        pr5,
        px5,
        pb5,
        pl5,
        mAuto,
        mtAuto,
        myAuto,
        mrAuto,
        mxAuto,
        mbAuto,
        mlAuto,
        textJustify,
        textNowrap,
        textTruncate,
        textLeft,
        textRight,
        textCenter,
        textLowercase,
        textUppercase,
        textCapitalize,
        textWhite,
        textBlack,
        visible,
        invisible,
        opacity0,
        border,
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        border0,
        borderTop0,
        borderRight0,
        borderBottom0,
        borderLeft0,
        borderDark,
        borderWhite,
        bgLight,
        flexGrow,
        bRounded,
        bCircle,
        ...rest
    } = props;

    return (
        <div className={
            "" +
            (dNone ? ` ${classes.dNone}` : '') +
            (dInline ? ` ${classes.dInline}` : '') +
            (dInlineBlock ? ` ${classes.dInlineBlock}` : '') +
            (dBlock ? ` ${classes.dBlock}` : '') +
            (dTable ? ` ${classes.dTable}` : '') +
            (dTableRow ? ` ${classes.dTableRow}` : '') +
            (dTableCell ? ` ${classes.dTableCell}` : '') +
            (dFlex ? ` ${classes.dFlex}` : '') +
            (dInlineFlex ? ` ${classes.dInlineFlex}` : '') +
            (flexRow ? ` ${classes.flexRow}` : '') +
            (flexColumn ? ` ${classes.flexColumn}` : '') +
            (flexRowReverse ? ` ${classes.flexRowReverse}` : '') +
            (flexColumnReverse ? ` ${classes.flexColumnReverse}` : '') +
            (flexWrap ? ` ${classes.flexWrap}` : '') +
            (flexNowrap ? ` ${classes.flexNowrap}` : '') +
            (flexWrapReverse ? ` ${classes.flexWrapReverse}` : '') +
            (justifyContentStart ? ` ${classes.justifyContentStart}` : '') +
            (justifyContentEnd ? ` ${classes.justifyContentEnd}` : '') +
            (justifyContentCenter ? ` ${classes.justifyContentCenter}` : '') +
            (justifyContentBetween ? ` ${classes.justifyContentBetween}` : '') +
            (justifyContentAround ? ` ${classes.justifyContentAround}` : '') +
            (alignItemsStart ? ` ${classes.alignItemsStart}` : '') +
            (alignItemsEnd ? ` ${classes.alignItemsEnd}` : '') +
            (alignItemsCenter ? ` ${classes.alignItemsCenter}` : '') +
            (alignItemsBaseline ? ` ${classes.alignItemsBaseline}` : '') +
            (alignItemsStretch ? ` ${classes.alignItemsStretch}` : '') +
            (alignSelfAuto ? ` ${classes.alignSelfAuto}` : '') +
            (alignSelfStart ? ` ${classes.alignSelfStart}` : '') +
            (alignSelfEnd ? ` ${classes.alignSelfEnd}` : '') +
            (alignSelfCenter ? ` ${classes.alignSelfCenter}` : '') +
            (alignSelfBaseline ? ` ${classes.alignSelfBaseline}` : '') +
            (alignSelfStretch ? ` ${classes.alignSelfStretch}` : '') +
            (floatLeft ? ` ${classes.floatLeft}` : '') +
            (floatRight ? ` ${classes.floatRight}` : '') +
            (floatNone ? ` ${classes.floatNone}` : '') +
            (positionStatic ? ` ${classes.positionStatic}` : '') +
            (positionRelative ? ` ${classes.positionRelative}` : '') +
            (positionAbsolute ? ` ${classes.positionAbsolute}` : '') +
            (positionFixed ? ` ${classes.positionFixed}` : '') +
            (positionSticky ? ` ${classes.positionSticky}` : '') +
            (fixedTop ? ` ${classes.fixedTop}` : '') +
            (fixedBottom ? ` ${classes.fixedBottom}` : '') +
            (w25 ? ` ${classes.w25}` : '') +
            (w50 ? ` ${classes.w50}` : '') +
            (w75 ? ` ${classes.w75}` : '') +
            (w100 ? ` ${classes.w100}` : '') +
            (h25 ? ` ${classes.h25}` : '') +
            (h50 ? ` ${classes.h50}` : '') +
            (h75 ? ` ${classes.h75}` : '') +
            (h100 ? ` ${classes.h100}` : '') +
            (mw100 ? ` ${classes.mw100}` : '') +
            (mh100 ? ` ${classes.mh100}` : '') +
            (m0 ? ` ${classes.m0}` : '') +
            (mt0 ? ` ${classes.mt0}` : '') +
            (my0 ? ` ${classes.my0}` : '') +
            (mr0 ? ` ${classes.mr0}` : '') +
            (mx0 ? ` ${classes.mx0}` : '') +
            (mb0 ? ` ${classes.mb0}` : '') +
            (ml0 ? ` ${classes.ml0}` : '') +
            (m1 ? ` ${classes.m1}` : '') +
            (mt1 ? ` ${classes.mt1}` : '') +
            (my1 ? ` ${classes.my1}` : '') +
            (mr1 ? ` ${classes.mr1}` : '') +
            (mx1 ? ` ${classes.mx1}` : '') +
            (mb1 ? ` ${classes.mb1}` : '') +
            (ml1 ? ` ${classes.ml1}` : '') +
            (m2 ? ` ${classes.m2}` : '') +
            (mt2 ? ` ${classes.mt2}` : '') +
            (my2 ? ` ${classes.my2}` : '') +
            (mr2 ? ` ${classes.mr2}` : '') +
            (mx2 ? ` ${classes.mx2}` : '') +
            (mb2 ? ` ${classes.mb2}` : '') +
            (ml2 ? ` ${classes.ml2}` : '') +
            (m3 ? ` ${classes.m3}` : '') +
            (mt3 ? ` ${classes.mt3}` : '') +
            (my3 ? ` ${classes.my3}` : '') +
            (mr3 ? ` ${classes.mr3}` : '') +
            (mx3 ? ` ${classes.mx3}` : '') +
            (mb3 ? ` ${classes.mb3}` : '') +
            (ml3 ? ` ${classes.ml3}` : '') +
            (m4 ? ` ${classes.m4}` : '') +
            (mt4 ? ` ${classes.mt4}` : '') +
            (my4 ? ` ${classes.my4}` : '') +
            (mr4 ? ` ${classes.mr4}` : '') +
            (mx4 ? ` ${classes.mx4}` : '') +
            (mb4 ? ` ${classes.mb4}` : '') +
            (ml4 ? ` ${classes.ml4}` : '') +
            (m5 ? ` ${classes.m5}` : '') +
            (mt5 ? ` ${classes.mt5}` : '') +
            (my5 ? ` ${classes.my5}` : '') +
            (mr5 ? ` ${classes.mr5}` : '') +
            (mx5 ? ` ${classes.mx5}` : '') +
            (mb5 ? ` ${classes.mb5}` : '') +
            (ml5 ? ` ${classes.ml5}` : '') +
            (p0 ? ` ${classes.p0}` : '') +
            (pt0 ? ` ${classes.pt0}` : '') +
            (py0 ? ` ${classes.py0}` : '') +
            (pr0 ? ` ${classes.pr0}` : '') +
            (px0 ? ` ${classes.px0}` : '') +
            (pb0 ? ` ${classes.pb0}` : '') +
            (pl0 ? ` ${classes.pl0}` : '') +
            (p1 ? ` ${classes.p1}` : '') +
            (pt1 ? ` ${classes.pt1}` : '') +
            (py1 ? ` ${classes.py1}` : '') +
            (pr1 ? ` ${classes.pr1}` : '') +
            (px1 ? ` ${classes.px1}` : '') +
            (pb1 ? ` ${classes.pb1}` : '') +
            (pl1 ? ` ${classes.pl1}` : '') +
            (p2 ? ` ${classes.p2}` : '') +
            (pt2 ? ` ${classes.pt2}` : '') +
            (py2 ? ` ${classes.py2}` : '') +
            (pr2 ? ` ${classes.pr2}` : '') +
            (px2 ? ` ${classes.px2}` : '') +
            (pb2 ? ` ${classes.pb2}` : '') +
            (pl2 ? ` ${classes.pl2}` : '') +
            (p3 ? ` ${classes.p3}` : '') +
            (pt3 ? ` ${classes.pt3}` : '') +
            (py3 ? ` ${classes.py3}` : '') +
            (pr3 ? ` ${classes.pr3}` : '') +
            (px3 ? ` ${classes.px3}` : '') +
            (pb3 ? ` ${classes.pb3}` : '') +
            (pl3 ? ` ${classes.pl3}` : '') +
            (p4 ? ` ${classes.p4}` : '') +
            (pt4 ? ` ${classes.pt4}` : '') +
            (py4 ? ` ${classes.py4}` : '') +
            (pr4 ? ` ${classes.pr4}` : '') +
            (px4 ? ` ${classes.px4}` : '') +
            (pb4 ? ` ${classes.pb4}` : '') +
            (pl4 ? ` ${classes.pl4}` : '') +
            (p5 ? ` ${classes.p5}` : '') +
            (pt5 ? ` ${classes.pt5}` : '') +
            (py5 ? ` ${classes.py5}` : '') +
            (pr5 ? ` ${classes.pr5}` : '') +
            (px5 ? ` ${classes.px5}` : '') +
            (pb5 ? ` ${classes.pb5}` : '') +
            (pl5 ? ` ${classes.pl5}` : '') +
            (mAuto ? ` ${classes.mAuto}` : '') +
            (mtAuto ? ` ${classes.mtAuto}` : '') +
            (myAuto ? ` ${classes.myAuto}` : '') +
            (mrAuto ? ` ${classes.mrAuto}` : '') +
            (mxAuto ? ` ${classes.mxAuto}` : '') +
            (mbAuto ? ` ${classes.mbAuto}` : '') +
            (mlAuto ? ` ${classes.mlAuto}` : '') +
            (textJustify ? ` ${classes.textJustify}` : '') +
            (textNowrap ? ` ${classes.textNowrap}` : '') +
            (textTruncate ? ` ${classes.textTruncate}` : '') +
            (textLeft ? ` ${classes.textLeft}` : '') +
            (textRight ? ` ${classes.textRight}` : '') +
            (textCenter ? ` ${classes.textCenter}` : '') +
            (textLowercase ? ` ${classes.textLowercase}` : '') +
            (textUppercase ? ` ${classes.textUppercase}` : '') +
            (textCapitalize ? ` ${classes.textCapitalize}` : '') +
            (textWhite ? ` ${classes.textWhite}` : '') +
            (textBlack ? ` ${classes.textBlack}` : '') +
            (visible ? ` ${classes.visible}` : '') +
            (invisible ? ` ${classes.invisible}` : '') +
            (opacity0 ? ` ${classes.opacity0}` : '') +
            (border ? ` ${classes.border}` : '') +
            (borderTop ? ` ${classes.borderTop}` : '') +
            (borderRight ? ` ${classes.borderRight}` : '') +
            (borderBottom ? ` ${classes.borderBottom}` : '') +
            (borderLeft ? ` ${classes.borderLeft}` : '') +
            (border0 ? ` ${classes.border0}` : '') +
            (borderTop0 ? ` ${classes.borderTop0}` : '') +
            (borderRight0 ? ` ${classes.borderRight0}` : '') +
            (borderBottom0 ? ` ${classes.borderBottom0}` : '') +
            (borderLeft0 ? ` ${classes.borderLeft0}` : '') +
            (borderDark ? ` ${classes.borderDark}` : '') +
            (borderWhite ? ` ${classes.borderWhite}` : '') +
            (bgLight ? ` ${classes.bgLight}` : '') +
            (flexGrow ? ` ${classes.flexGrow}` : '') +
            (bRounded ? ` ${classes.bRounded}` : '') +
            (bCircle ? ` ${classes.bCircle}` : '')
        } {...rest}>{children}</div>
    );
}

Section.propTypes = {
    children: PropTypes.node,
    dNone: PropTypes.bool,
    dInline: PropTypes.bool,
    dInlineBlock: PropTypes.bool,
    dBlock: PropTypes.bool,
    dTable: PropTypes.bool,
    dTableRow: PropTypes.bool,
    dTableCell: PropTypes.bool,
    dFlex: PropTypes.bool,
    dInlineFlex: PropTypes.bool,
    flexRow: PropTypes.bool,
    flexColumn: PropTypes.bool,
    flexRowReverse: PropTypes.bool,
    flexColumnReverse: PropTypes.bool,
    flexWrap: PropTypes.bool,
    flexNowrap: PropTypes.bool,
    flexWrapReverse: PropTypes.bool,
    justifyContentStart: PropTypes.bool,
    justifyContentEnd: PropTypes.bool,
    justifyContentCenter: PropTypes.bool,
    justifyContentBetween: PropTypes.bool,
    justifyContentAround: PropTypes.bool,
    alignItemsStart: PropTypes.bool,
    alignItemsEnd: PropTypes.bool,
    alignItemsCenter: PropTypes.bool,
    alignItemsBaseline: PropTypes.bool,
    alignItemsStretch: PropTypes.bool,
    alignSelfAuto: PropTypes.bool,
    alignSelfStart: PropTypes.bool,
    alignSelfEnd: PropTypes.bool,
    alignSelfCenter: PropTypes.bool,
    alignSelfBaseline: PropTypes.bool,
    alignSelfStretch: PropTypes.bool,
    floatLeft: PropTypes.bool,
    floatRight: PropTypes.bool,
    floatNone: PropTypes.bool,
    positionStatic: PropTypes.bool,
    positionRelative: PropTypes.bool,
    positionAbsolute: PropTypes.bool,
    positionFixed: PropTypes.bool,
    positionSticky: PropTypes.bool,
    fixedTop: PropTypes.bool,
    fixedBottom: PropTypes.bool,
    w25: PropTypes.bool,
    w50: PropTypes.bool,
    w75: PropTypes.bool,
    w100: PropTypes.bool,
    h25: PropTypes.bool,
    h50: PropTypes.bool,
    h75: PropTypes.bool,
    h100: PropTypes.bool,
    mw100: PropTypes.bool,
    mh100: PropTypes.bool,
    m0: PropTypes.bool,
    mt0: PropTypes.bool,
    my0: PropTypes.bool,
    mr0: PropTypes.bool,
    mx0: PropTypes.bool,
    mb0: PropTypes.bool,
    ml0: PropTypes.bool,
    m1: PropTypes.bool,
    mt1: PropTypes.bool,
    my1: PropTypes.bool,
    mr1: PropTypes.bool,
    mx1: PropTypes.bool,
    mb1: PropTypes.bool,
    ml1: PropTypes.bool,
    m2: PropTypes.bool,
    mt2: PropTypes.bool,
    my2: PropTypes.bool,
    mr2: PropTypes.bool,
    mx2: PropTypes.bool,
    mb2: PropTypes.bool,
    ml2: PropTypes.bool,
    m3: PropTypes.bool,
    mt3: PropTypes.bool,
    my3: PropTypes.bool,
    mr3: PropTypes.bool,
    mx3: PropTypes.bool,
    mb3: PropTypes.bool,
    ml3: PropTypes.bool,
    m4: PropTypes.bool,
    mt4: PropTypes.bool,
    my4: PropTypes.bool,
    mr4: PropTypes.bool,
    mx4: PropTypes.bool,
    mb4: PropTypes.bool,
    ml4: PropTypes.bool,
    m5: PropTypes.bool,
    mt5: PropTypes.bool,
    my5: PropTypes.bool,
    mr5: PropTypes.bool,
    mx5: PropTypes.bool,
    mb5: PropTypes.bool,
    ml5: PropTypes.bool,
    p0: PropTypes.bool,
    pt0: PropTypes.bool,
    py0: PropTypes.bool,
    pr0: PropTypes.bool,
    px0: PropTypes.bool,
    pb0: PropTypes.bool,
    pl0: PropTypes.bool,
    p1: PropTypes.bool,
    pt1: PropTypes.bool,
    py1: PropTypes.bool,
    pr1: PropTypes.bool,
    px1: PropTypes.bool,
    pb1: PropTypes.bool,
    pl1: PropTypes.bool,
    p2: PropTypes.bool,
    pt2: PropTypes.bool,
    py2: PropTypes.bool,
    pr2: PropTypes.bool,
    px2: PropTypes.bool,
    pb2: PropTypes.bool,
    pl2: PropTypes.bool,
    p3: PropTypes.bool,
    pt3: PropTypes.bool,
    py3: PropTypes.bool,
    pr3: PropTypes.bool,
    px3: PropTypes.bool,
    pb3: PropTypes.bool,
    pl3: PropTypes.bool,
    p4: PropTypes.bool,
    pt4: PropTypes.bool,
    py4: PropTypes.bool,
    pr4: PropTypes.bool,
    px4: PropTypes.bool,
    pb4: PropTypes.bool,
    pl4: PropTypes.bool,
    p5: PropTypes.bool,
    pt5: PropTypes.bool,
    py5: PropTypes.bool,
    pr5: PropTypes.bool,
    px5: PropTypes.bool,
    pb5: PropTypes.bool,
    pl5: PropTypes.bool,
    mAuto: PropTypes.bool,
    mtAuto: PropTypes.bool,
    myAuto: PropTypes.bool,
    mrAuto: PropTypes.bool,
    mxAuto: PropTypes.bool,
    mbAuto: PropTypes.bool,
    mlAuto: PropTypes.bool,
    textJustify: PropTypes.bool,
    textNowrap: PropTypes.bool,
    textTruncate: PropTypes.bool,
    textLeft: PropTypes.bool,
    textRight: PropTypes.bool,
    textCenter: PropTypes.bool,
    textLowercase: PropTypes.bool,
    textUppercase: PropTypes.bool,
    textCapitalize: PropTypes.bool,
    textWhite: PropTypes.bool,
    textBlack: PropTypes.bool,
    visible: PropTypes.bool,
    invisible: PropTypes.bool,
    opacity0: PropTypes.bool,
    border: PropTypes.bool,
    borderTop: PropTypes.bool,
    borderRight: PropTypes.bool,
    borderBottom: PropTypes.bool,
    borderLeft: PropTypes.bool,
    border0: PropTypes.bool,
    borderTop0: PropTypes.bool,
    borderRight0: PropTypes.bool,
    borderBottom0: PropTypes.bool,
    borderLeft0: PropTypes.bool,
    borderDark: PropTypes.bool,
    borderWhite: PropTypes.bool,
    bgLight: PropTypes.bool,
    flexGrow: PropTypes.bool,
    bRounded: PropTypes.bool,
    bCircle: PropTypes.bool,
};

export default Section;